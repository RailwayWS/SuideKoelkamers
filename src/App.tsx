import "./App.css";
import sliderIcon from "./assets/slider_icon.png";
import hero from "./assets/hero_background.png";
import Navbar from "./components/navbar/navbar";
import AboutSection from "./components/about/about";
import WhyChooseSection from "./components/whyChoose/whyChoose";
import ProductsSection from "./components/products/products";
import CtaSection from "./components/cta/cta";
import FaqSection from "./components/faq/faq";
import ContactSection from "./components/contact/contact";

function App() {
    return (
        <div className="app-container">
            <Navbar />

            {/* Hero Section */}
            <header
                className="hero"
                style={{ backgroundImage: `url(${hero})` }}
            >
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

            <WhyChooseSection />

            <ProductsSection />

            <CtaSection />

            <FaqSection />

            <ContactSection />
        </div>
    );
}

export default App;
