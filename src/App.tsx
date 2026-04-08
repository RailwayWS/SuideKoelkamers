import {
    useState,
    useEffect,
    useCallback,
    useRef,
    lazy,
    Suspense,
} from "react";
import "./App.css";
import sliderIcon from "./assets/icons/slider_icon.png";

/* ── Hero images (WebP compressed) ──────────────────────────────────────── */
import heroDesktopWebp from "./assets/hero/hero_desktop.webp";
import heroMobile2Webp from "./assets/hero/hero_mobile2.webp";
import salamieWebp from "./assets/hero/salamie.webp";

import koelkamersLogo from "./assets/logos/koelkamers-logo-1.png";
import vleisLogo from "./assets/logos/vleis-logo-1.png";

/* ── Above-fold components (eagerly loaded) ─────────────────────────────── */
import Navbar from "./components/navbar/navbar";
import AboutSection from "./components/about/about";

/* ── Below-fold components (code-split) ─────────────────────────────────── */
const OurStorySection = lazy(() => import("./components/ourStory/ourStory"));
const WhyChooseSection = lazy(() => import("./components/whyChoose/whyChoose"));
const ProductsSection = lazy(() => import("./components/products/products"));
const CtaSection = lazy(() => import("./components/cta/cta"));
const FaqSection = lazy(() => import("./components/faq/faq"));
const ContactSection = lazy(() => import("./components/contact/contact"));

import {
    hideAppLoader,
    preloadImagesWithin,
    waitForFullLoad,
} from "./utils/preloadImages";

// Desktop hero should stay static
const HERO_SLIDES_DESKTOP = [heroDesktopWebp];
// Mobile hero cycles through all images labeled "mobile" (+ the team + the salamis)
const HERO_SLIDES_MOBILE = [salamieWebp, heroDesktopWebp, heroMobile2Webp];
const HERO_SLOGANS = [
    "Where customers become friends",
    "Enjoy farm-to-table quality meat at your next Namib braai",
    "A braai always brings people together for a great time",
];
const SLIDE_DURATION_MOBILE = 5000;
/** Time before the new slogan fades in (lets the bg transition settle first) */
const SLOGAN_FADE_IN_DELAY = 700;
/** Duration the slogan is invisible while text swaps (matches CSS transition) */
const SLOGAN_TEXT_SWAP_MS = 500;

function App() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [displaySlogan, setDisplaySlogan] = useState(HERO_SLOGANS[0]);
    // Start hidden so the first slogan fades in with the rest of the hero text.
    const [sloganVisible, setSloganVisible] = useState(false);
    const [isMobileHero, setIsMobileHero] = useState(false);
    const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([]);
    const heroPreloadRef = useRef<HTMLElement | null>(null);
    const isInitialMount = useRef(true);

    const heroSlides = isMobileHero ? HERO_SLIDES_MOBILE : HERO_SLIDES_DESKTOP;

    /* ── Strict preload: keep site hidden until heavy assets are ready ──────── */
    useEffect(() => {
        let cancelled = false;

        const run = async () => {
            // Wait a tick so the initial render committed (About section is mounted)
            await new Promise((r) => requestAnimationFrame(() => r(null)));

            const heroEl = heroPreloadRef.current;
            const aboutEl = document.getElementById("about");

            try {
                // Wait for BOTH above-fold images AND full page load (fonts,
                // stylesheets, etc.).  waitForFullLoad includes an 8 s fallback
                // so we never trap the user if a third-party resource stalls.
                await Promise.all([
                    preloadImagesWithin([heroEl, aboutEl], {
                        includeBackgroundImages: true,
                    }),
                    waitForFullLoad(),
                ]);
            } catch {
                // Swallow — the fallback timeout in waitForFullLoad guarantees
                // we won't stay stuck.
            }

            if (!cancelled) hideAppLoader();
        };

        run();
        return () => {
            cancelled = true;
        };
    }, []);

    const clearTimers = () => {
        timerRefs.current.forEach(clearTimeout);
        timerRefs.current = [];
    };

    const goToNext = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, [heroSlides.length]);

    /* ── Mobile-only hero backgrounds ── */
    useEffect(() => {
        const mq = window.matchMedia("(max-width: 768px)");

        const apply = () => setIsMobileHero(mq.matches);
        apply();

        mq.addEventListener("change", apply);
        return () => mq.removeEventListener("change", apply);
    }, []);

    // If we switch between desktop/mobile slide arrays, clamp the current index
    useEffect(() => {
        setCurrentSlide((prev) => prev % heroSlides.length);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobileHero]);

    /* ── Slogan cross-fade whenever slide changes ── */
    useEffect(() => {
        clearTimers();
        setSloganVisible(false);

        if (isInitialMount.current) {
            // --- INITIAL LOAD ---
            // Fades in instantly with the rest of the text, no more 1200ms delay.
            const t1 = setTimeout(() => {
                setSloganVisible(true);
            }, 100);

            timerRefs.current = [t1];
            isInitialMount.current = false;
        } else {
            // --- MOBILE SLIDE CYCLING ---
            // Step 1: swap text while invisible
            const t1 = setTimeout(() => {
                setDisplaySlogan(
                    HERO_SLOGANS[currentSlide % HERO_SLOGANS.length],
                );
            }, SLOGAN_TEXT_SWAP_MS);

            // Step 2: fade new slogan in once background has settled
            const t2 = setTimeout(() => {
                setSloganVisible(true);
            }, SLOGAN_FADE_IN_DELAY);

            timerRefs.current = [t1, t2];
        }

        return clearTimers;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSlide]);

    /* ── Auto-advance slideshow ── */
    useEffect(() => {
        // Desktop background is static; only auto-advance on mobile.
        if (!isMobileHero) return;

        const timer = setInterval(goToNext, SLIDE_DURATION_MOBILE);
        return () => clearInterval(timer);
    }, [goToNext, isMobileHero]);

    return (
        <div className="app-container">
            <Navbar />

            {/* Hero Section — Slideshow */}
            <header className="hero" id="home" ref={heroPreloadRef}>
                {heroSlides.map((src: string, i: number) => (
                    <div
                        key={i}
                        className={`hero-slide ${i === currentSlide ? "active" : ""}`}
                    >
                        <img
                            src={src}
                            alt=""
                            className={`hero-slide-img ${src === heroDesktopWebp && isMobileHero ? "hero-slide-img--contain" : ""}`}
                            draggable={false}
                            fetchPriority={i === 0 ? "high" : "low"}
                            decoding={i === 0 ? "sync" : "async"}
                        />
                    </div>
                ))}

                <div className="hero-overlay" />

                <div className="container hero-container-inner">
                    <div className="hero-content">
                        <div className="hero-icon-wrapper hero-fade hero-fade--d1">
                            <img
                                src={sliderIcon}
                                alt="Butcher Icon"
                                className="slider-icon"
                                width={80}
                                height={80}
                            />
                        </div>

                        <h1 className="hero-title hero-fade hero-fade--d2">
                            Suide Koelkamers
                        </h1>

                        <p className="hero-subtitle hero-fade hero-fade--d3">
                            Your Local Butchery
                        </p>

                        {/* Dynamic slogan — synced to background slide */}
                        <p
                            className={`hero-slogan ${sloganVisible ? "hero-slogan--visible" : ""}`}
                            aria-live="polite"
                        >
                            {displaySlogan}
                        </p>

                        <div className="hero-logos-row hero-fade hero-fade--d4">
                            <div className="hero-logo-item">
                                <img
                                    src={koelkamersLogo}
                                    alt="Suide Koelkamers"
                                    className="hero-logo-img"
                                />
                                <span>Keetmanshoop</span>
                            </div>

                            <button
                                className="cta-button"
                                onClick={() => {
                                    const el =
                                        document.getElementById("contact");
                                    if (el)
                                        el.scrollIntoView({
                                            behavior: "smooth",
                                        });
                                }}
                            >
                                Contact Us
                            </button>

                            <div className="hero-logo-item">
                                <img
                                    src={vleisLogo}
                                    alt="Suide Vleis"
                                    className="hero-logo-img"
                                />
                                <span>Mariental</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll cue */}
                <div className="hero-scroll-cue" aria-hidden="true">
                    <span>Scroll</span>
                    <div className="scroll-arrow" />
                </div>
            </header>

            <AboutSection />
            <Suspense fallback={null}>
                <OurStorySection />
                <WhyChooseSection />
                <ProductsSection />
                <CtaSection />
                <FaqSection />
                <ContactSection />
            </Suspense>
        </div>
    );
}

export default App;
