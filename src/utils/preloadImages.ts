type PreloadOptions = {
    /** If true, also preloads all `background-image: url(...)` found in element computed styles. */
    includeBackgroundImages?: boolean;
};

function getUrlFromCssValue(value: string): string[] {
    // Example: url("/path/file.jpg") or url(/path/file.jpg)
    const urls: string[] = [];
    const re = /url\((['"]?)(.*?)\1\)/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(value))) {
        if (m[2]) urls.push(m[2]);
    }
    return urls;
}

function preloadUrl(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () =>
            reject(new Error(`Failed to preload image: ${url}`));
        // Important: set src last
        img.src = url;

        // Cache-hit fast path
        if (img.complete) resolve();
    });
}

/**
 * Preloads all images inside the given root elements.
 *
 * What it covers:
 * - <img> and currentSrc (responsive + srcset-aware)
 * - <picture> via its contained <img>
 * - Inline style and computed CSS background-image URLs (optional)
 */
export async function preloadImagesWithin(
    roots: Array<HTMLElement | null | undefined>,
    options: PreloadOptions = {},
): Promise<void> {
    const includeBackgroundImages = options.includeBackgroundImages ?? true;

    const urls = new Set<string>();

    for (const root of roots) {
        if (!root) continue;

        const imgs = Array.from(root.querySelectorAll("img"));
        for (const img of imgs) {
            // currentSrc is the exact resource selected by the browser (srcset/picture)
            const src =
                (img as HTMLImageElement).currentSrc ||
                (img as HTMLImageElement).src;
            if (src) urls.add(src);
        }

        if (includeBackgroundImages) {
            const allEls = [
                root,
                ...Array.from(root.querySelectorAll("*")),
            ] as HTMLElement[];
            for (const el of allEls) {
                const computed = window.getComputedStyle(el);
                const bg = computed.backgroundImage;
                if (bg && bg !== "none") {
                    for (const u of getUrlFromCssValue(bg)) urls.add(u);
                }
            }
        }
    }

    await Promise.all(Array.from(urls).map((u) => preloadUrl(u)));
}

/** Maximum time (ms) to keep the loader visible before forcing it away. */
const LOADER_FALLBACK_MS = 8_000;

/**
 * Returns a `Promise` that resolves once the browser's `load` event has fired
 * (meaning all sub-resources — images, stylesheets, fonts — have finished
 * loading) **or** after {@link LOADER_FALLBACK_MS} ms, whichever comes first.
 *
 * This prevents the loader from hanging indefinitely if a third-party font or
 * analytics script stalls.
 */
export function waitForFullLoad(): Promise<void> {
    return new Promise((resolve) => {
        if (document.readyState === "complete") {
            resolve();
            return;
        }

        let settled = false;

        const done = () => {
            if (settled) return;
            settled = true;
            window.removeEventListener("load", done);
            clearTimeout(fallback);
            resolve();
        };

        window.addEventListener("load", done, { once: true });
        const fallback = window.setTimeout(done, LOADER_FALLBACK_MS);
    });
}

/**
 * Fades out and removes the initial loader overlay inserted in index.html.
 */
export function hideAppLoader(): void {
    const loader = document.getElementById("app-loader");
    if (!loader) {
        document.body.classList.add("app-loaded");
        return;
    }

    loader.classList.add("app-loader--hide");
    document.body.classList.add("app-loaded");

    const remove = () => loader.remove();
    loader.addEventListener("transitionend", remove, { once: true });

    // Fallback in case transitionend doesn't fire
    window.setTimeout(remove, 800);
}
