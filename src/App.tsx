import { useState, useEffect, useCallback, useRef } from "react";
import "./App.css";
import sliderIcon from "./assets/slider_icon.png";
import hero1 from "./assets/hero_background.png";
import hero2 from "./assets/herobackground2.jpeg";
import Navbar from "./components/navbar/navbar";
import AboutSection from "./components/about/about";
import OurStorySection from "./components/ourStory/ourStory";
import WhyChooseSection from "./components/whyChoose/whyChoose";
import ProductsSection from "./components/products/products";
import CtaSection from "./components/cta/cta";
import FaqSection from "./components/faq/faq";
import ContactSection from "./components/contact/contact";
import Footer from "./components/footer/footer";

const HERO_SLIDES = [hero1, hero2];
const HERO_SLOGANS = [
    "Premium Cold Storage Solutions",
    "Keeping Your Produce Fresh and Secure",
];
const SLIDE_DURATION = 10000;
/** Time before the new slogan fades in (lets the bg transition settle first) */
const SLOGAN_FADE_IN_DELAY = 700;
/** Duration the slogan is invisible while text swaps (matches CSS transition) */
const SLOGAN_TEXT_SWAP_MS  = 500;

function App() {
    const [currentSlide, setCurrentSlide]  = useState(0);
    const [displaySlogan, setDisplaySlogan] = useState(HERO_SLOGANS[0]);
    const [sloganVisible, setSloganVisible] = useState(true);
    const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

    const clearTimers = () => {
        timerRefs.current.forEach(clearTimeout);
        timerRefs.current = [];
    };

    const goToNext = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, []);

    /* ── Slogan cross-fade whenever slide changes ── */
    useEffect(() => {
        clearTimers();

        // Step 1 — fade current slogan out immediately
        setSloganVisible(false);

        // Step 2 — swap text while invisible
        const t1 = setTimeout(() => {
            setDisplaySlogan(HERO_SLOGANS[currentSlide % HERO_SLOGANS.length]);
        }, SLOGAN_TEXT_SWAP_MS);

        // Step 3 — fade new slogan in once bg has settled
        const t2 = setTimeout(() => {
            setSloganVisible(true);
        }, SLOGAN_FADE_IN_DELAY);

        timerRefs.current = [t1, t2];

        return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSlide]);

    /* ── Auto-advance slideshow ── */
    useEffect(() => {
        const timer = setInterval(goToNext, SLIDE_DURATION);
        return () => clearInterval(timer);
    }, [goToNext]);

    return (
        <div className="app-container">
            <Navbar />

            {/* Hero Section — Slideshow */}
            <header className="hero" id="home">
                {HERO_SLIDES.map((src, i) => (
                    <div
                        key={i}
                        className={`hero-slide ${i === currentSlide ? "active" : ""}`}
                        style={{ backgroundImage: `url(${src})` }}
                    />
                ))}

                <div className="hero-overlay" />

                <div className="container hero-container-inner">
                    <div className="hero-content">
                        <div className="hero-icon-wrapper hero-fade hero-fade--d1">
                            <img
                                src={sliderIcon}
                                alt="Butcher Icon"
                                className="slider-icon"
                            />
                        </div>

                        <h1 className="hero-title hero-fade hero-fade--d2">
                            Suide Koelkamers
                        </h1>

                        <p className="hero-subtitle hero-fade hero-fade--d3">
                            Butcher &amp; Meat Shop
                        </p>

                        {/* Dynamic slogan — synced to background slide */}
                        <p
                            className={`hero-slogan ${sloganVisible ? "hero-slogan--visible" : ""}`}
                            aria-live="polite"
                        >
                            {displaySlogan}
                        </p>

                        <button
                            className="cta-button hero-fade hero-fade--d4"
                            onClick={() => {
                                const el = document.getElementById("contact");
                                if (el) el.scrollIntoView({ behavior: "smooth" });
                            }}
                        >
                            Contact Us
                        </button>
                    </div>
                </div>

                {/* Scroll cue */}
                <div className="hero-scroll-cue" aria-hidden="true">
                    <span>Scroll</span>
                    <div className="scroll-arrow" />
                </div>
            </header>

            <AboutSection />
            <OurStorySection />
            <WhyChooseSection />
            <ProductsSection />
            <CtaSection />
            <FaqSection />
            <ContactSection />
            <Footer />
        </div>
    );
}

export default App;
