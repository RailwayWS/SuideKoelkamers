import { useEffect, useRef } from "react";

/**
 * Observes children of the given ref and adds the `is-visible` class
 * when they scroll into view. Attach the returned ref to a wrapper element
 * and give animatable children the class `reveal`.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
    const ref = useRef<T>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target); // animate once
                    }
                }
            },
            { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
        );

        const targets = el.querySelectorAll(".reveal");
        targets.forEach((t) => observer.observe(t));

        return () => observer.disconnect();
    }, []);

    return ref;
}
