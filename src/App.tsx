import "./App.css";
import sliderIcon from "./assets/slider_icon.png";
import sliderBg from "./assets/slider_bg02.jpg";
import Navbar from "./components/navbar/navbar";
import AboutSection from "./components/about/about";
import WhyChooseSection from "./components/whyChoose/whyChoose";
import ProductsSection from "./components/products/products";
import CtaSection from "./components/cta/cta";
import FaqSection from "./components/faq/faq";

function App() {
    return (
        <div className="app-container">
            <Navbar />

            {/* Hero Section */}
            <header
                className="hero"
                style={{ backgroundImage: `url(${sliderBg})` }}
            >
                <div className="hero-overlay"></div>
                <div className="container hero-container-inner">
                    <div className="hero-content">
                        {/* Central Icon */}
                        <div className="hero-icon-wrapper">
                            <img
                                src={sliderIcon}
                                alt="Butcher Icon"
                                className="slider-icon"
                            />
                        </div>

                        <h1 className="hero-title">Suide Koelkamers</h1>
                        <h2 className="hero-subtitle">BUTCHER & MEAT SHOP</h2>

                        <button className="cta-button">ORDER NOW</button>
                    </div>
                </div>
            </header>

            <AboutSection />

            <WhyChooseSection />

            <ProductsSection />

            <CtaSection />

            <FaqSection />
        </div>
    );
}

export default App;
