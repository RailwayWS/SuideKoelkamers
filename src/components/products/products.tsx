import { useCallback, useEffect, useRef, useState } from "react";
import "./products.css";
import { useScrollReveal } from "../../hooks/useScrollReveal";

// import img1 from "../../assets/carousel/boud.webp";
import img2 from "../../assets/carousel/boud2.webp";
import img3 from "../../assets/carousel/braai.webp";
import img4 from "../../assets/carousel/brood.webp";
// import img5 from "../../assets/carousel/chips.webp";
// import img6 from "../../assets/carousel/lekker.webp";
import img7 from "../../assets/carousel/mense.webp";
// import img8 from "../../assets/carousel/namma.webp";
import img9 from "../../assets/carousel/namma2.webp";
// import img10 from "../../assets/carousel/salamie.webp";
import img11 from "../../assets/carousel/skinkbord.webp";
import img12 from "../../assets/carousel/skinkbord2.webp";
import img13 from "../../assets/carousel/slag.webp";
import img14 from "../../assets/carousel/slag2.webp";

const SLIDES = [img2, img3, img4, img7, img9, img11, img12, img13, img14];

export default function ProductsSection() {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);
    const [inView, setInView] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const sectionRef = useScrollReveal();
    const carouselRef = useRef<HTMLDivElement | null>(null);

    const goNext = useCallback(() => {
        setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, []);

    const goPrev = useCallback(() => {
        setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    }, []);

    const goTo = (idx: number) => setCurrent(idx);

    /* Start autoplay only when carousel enters the viewport */
    useEffect(() => {
        const el = carouselRef.current;
        if (!el) return;

        const io = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                setInView(Boolean(entry?.isIntersecting));
            },
            {
                root: null,
                // Treat it as "in view" when ~25% of the carousel is visible
                threshold: 0.25,
            },
        );

        io.observe(el);
        return () => io.disconnect();
    }, []);

    /* Auto‑advance every 5s, pause on hover (and when not in view) */
    useEffect(() => {
        if (paused || !inView) return;
        timerRef.current = setInterval(goNext, 5000);
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [paused, inView, goNext]);

    return (
        <section className="products-section" id="products" ref={sectionRef}>
            <div className="container products-container">
                {/* Carousel */}
                <div
                    className="modern-carousel reveal reveal--scale reveal--d2"
                    ref={carouselRef}
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    {/* Prev */}
                    <button
                        className="carousel-btn carousel-btn--prev"
                        type="button"
                        aria-label="Previous slide"
                        onClick={goPrev}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>

                    {/* Viewport */}
                    <div className="carousel-viewport">
                        <div
                            className="carousel-track"
                            style={{
                                transform: `translateX(-${current * 100}%)`,
                            }}
                        >
                            {SLIDES.map((src, i) => (
                                <div
                                    className={`carousel-slide ${i === current ? "is-active" : ""}`}
                                    key={i}
                                >
                                    <div className="slide-image-wrapper">
                                        <img
                                            src={src}
                                            alt={`Product ${i + 1}`}
                                            className="carousel-img"
                                            loading="lazy"
                                            draggable={false}
                                        />
                                        <div className="carousel-overlay"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Next */}
                    <button
                        className="carousel-btn carousel-btn--next"
                        type="button"
                        aria-label="Next slide"
                        onClick={goNext}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>

                    {/* Modern Pill Indicators */}
                    <div className="carousel-indicators">
                        {SLIDES.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                className={`indicator-pill ${i === current ? "active" : ""}`}
                                aria-label={`Go to slide ${i + 1}`}
                                onClick={() => goTo(i)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
