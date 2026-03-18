import { useState, useEffect, useCallback, useRef } from "react";
import "./App.css";
import sliderIcon from "./assets/icons/slider_icon.png";
import hero1 from "./assets/hero/hero_desktop.jpeg";
// import heroMobileA from "./assets/hero/hero_mobile.jpeg";
import heroMobile1 from "./assets/hero/hero_mobile1.jpg";
import heroMobile2 from "./assets/hero/hero_mobile2.jpg";
import heroMobile4 from "./assets/hero/hero_mobile4.jpg";
import Navbar from "./components/navbar/navbar";
import AboutSection from "./components/about/about";
import OurStorySection from "./components/ourStory/ourStory";
import WhyChooseSection from "./components/whyChoose/whyChoose";
import ProductsSection from "./components/products/products";
import CtaSection from "./components/cta/cta";
import FaqSection from "./components/faq/faq";
import ContactSection from "./components/contact/contact";

// Desktop hero should stay static
const HERO_SLIDES_DESKTOP = [hero1];
// Mobile hero cycles through all images labeled "mobile"
const HERO_SLIDES_MOBILE = [heroMobile1, heroMobile2, heroMobile4];
const HERO_SLOGANS = [
    "Where customers become friends",
    "Quality local meat for great times together",
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

    const heroSlides = isMobileHero ? HERO_SLIDES_MOBILE : HERO_SLIDES_DESKTOP;

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

    // Initial slogan reveal: sync with the subtitle (hero-fade--d3 = 1.4s)
    useEffect(() => {
        const t = setTimeout(() => setSloganVisible(true), 1400);
        return () => clearTimeout(t);
    }, []);

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
            <header className="hero" id="home">
                {heroSlides.map((src: string, i: number) => (
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
                                if (el)
                                    el.scrollIntoView({ behavior: "smooth" });
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
        </div>
    );
}

export default App;
