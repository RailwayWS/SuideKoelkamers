import { useState, useEffect, useCallback } from "react";
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

const HERO_SLIDES = [hero1, hero2];
const SLIDE_DURATION = 10000; // 10 seconds

function App() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const goToNext = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, []);

    useEffect(() => {
        const timer = setInterval(goToNext, SLIDE_DURATION);
        return () => clearInterval(timer);
    }, [goToNext]);

    return (
        <div className="app-container">
            <Navbar />

            {/* Hero Section — Slideshow */}
            <header className="hero">
                {HERO_SLIDES.map((src, i) => (
                    <div
                        key={i}
                        className={`hero-slide ${i === currentSlide ? "active" : ""}`}
                        style={{ backgroundImage: `url(${src})` }}
                    />
                ))}

                <div className="hero-overlay"></div>
                <div className="container hero-container-inner">
                    <div className="hero-content">
                        {/* Central Icon */}
                        <div className="hero-icon-wrapper hero-fade hero-fade--d1">
                            <img
                                src={sliderIcon}
                                alt="Butcher Icon"
                                className="slider-icon"
                            />
                        </div>

                        <h1 className="hero-title hero-fade hero-fade--d2">Suide Koelkamers</h1>
                        <h2 className="hero-subtitle hero-fade hero-fade--d3">BUTCHER & MEAT SHOP</h2>

                        <button className="cta-button hero-fade hero-fade--d4">CONTACT US</button>
                    </div>
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
