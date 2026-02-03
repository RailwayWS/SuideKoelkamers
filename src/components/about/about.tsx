import "./about.css";

import cowImg from "../../assets/cow.png";
import henImg from "../../assets/hen.png";
import pigImg from "../../assets/pig.png";
import sheepImg from "../../assets/sheep.png";

const CATEGORIES = [
    { label: "CHICKEN MEAT", img: henImg },
    { label: "PORK MEAT", img: pigImg },
    { label: "BEEF MEAT", img: cowImg },
    { label: "SHEEP MEAT", img: sheepImg },
];

export default function AboutSection() {
    return (
        <section className="about-section">
            <div className="container about-container">
                {/* Background Watermark Text */}
                <div className="watermark-text">About</div>

                {/* Left Content */}
                <div className="about-left">
                    <h4 className="subtitle-script">About Us</h4>
                    <h2 className="title-large">
                        Organic <br />
                        Premium <span className="highlight-red">Quality</span>
                    </h2>
                    <button className="cta-button">MORE ABOUT</button>
                </div>

                {/* Right Content (Circles) */}
                <div className="about-right">
                    {CATEGORIES.map((item) => (
                        <div key={item.label} className="category-item">
                            <div className="category-circle-outer">
                                <div className="category-circle-inner">
                                    <img
                                        src={item.img}
                                        alt={item.label}
                                        className="category-icon"
                                    />
                                </div>
                            </div>
                            <span className="category-label">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
