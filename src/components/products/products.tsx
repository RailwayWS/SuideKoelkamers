import { useCallback, useEffect, useRef, useState } from "react";
import "./products.css";
import { useScrollReveal } from "../../hooks/useScrollReveal";

import titleShapeImg from "../../assets/title_shape.png";

import img1 from "../../assets/products/product.jpeg";
import img2 from "../../assets/products/product2.jpeg";
import img3 from "../../assets/products/brood.jpeg";
import img4 from "../../assets/products/product4.jpeg";
import img5 from "../../assets/products/slag2.jpeg";

const SLIDES = [img1, img2, img3, img4, img5];

export default function ProductsSection() {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const sectionRef = useScrollReveal();

    const goNext = useCallback(() => {
        setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, []);

    const goPrev = useCallback(() => {
        setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    }, []);

    const goTo = (idx: number) => setCurrent(idx);

    /* Auto‑advance every 5s, pause on hover */
    useEffect(() => {
        if (paused) return;
        timerRef.current = setInterval(goNext, 5000);
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [paused, goNext]);

    return (
        <section className="products-section" ref={sectionRef}>
            <div className="container products-container">
                {/* Header */}
                <div className="section-header reveal">
                    <span className="subtitle-script">Premium Selection</span>
                    <h2 className="title-large">Our Organic Products</h2>
                    <div className="scissors-separator">
                        <img src={titleShapeImg} alt="Section separator" />
                    </div>
                </div>

                {/* Carousel */}
                <div
                    className="modern-carousel reveal reveal--scale reveal--d2"
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
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>

                    {/* Viewport */}
                    <div className="carousel-viewport">
                        <div
                            className="carousel-track"
                            style={{ transform: `translateX(-${current * 100}%)` }}
                        >
                            {SLIDES.map((src, i) => (
                                <div className={`carousel-slide ${i === current ? 'is-active' : ''}`} key={i}>
                                    <div className="slide-image-wrapper">
                                        <img
                                            src={src}
                                            alt={`Product ${i + 1}`}
                                            className="carousel-img"
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
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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