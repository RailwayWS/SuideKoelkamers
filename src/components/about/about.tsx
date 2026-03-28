import "./about.css";
import { useScrollReveal } from "../../hooks/useScrollReveal";

import cowImg from "../../assets/icons/cow.png";
import henImg from "../../assets/icons/hen.png";
import pigImg from "../../assets/icons/pig.png";
import sheepImg from "../../assets/icons/sheep.png";

const CATEGORIES = [
    { label: "CHICKEN", img: henImg },
    { label: "PORK", img: pigImg },
    { label: "BEEF", img: cowImg },
    { label: "MUTTON", img: sheepImg },
];

export default function AboutSection() {
    const ref = useScrollReveal();

    return (
        <section className="about-section" id="about" ref={ref}>
            <div className="container about-container">
                {/* Left Content */}
                <div className="about-left reveal reveal--left">
                    <span className="subtitle-script">About Us</span>
                    <h2 className="title-large">
                        Organic <br />
                        Premium <span className="highlight-red">Quality</span>
                    </h2>

                    <button
                        className="cta-button"
                        type="button"
                        onClick={() => {
                            const el = document.getElementById("ethos");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                    >
                        More About Us
                    </button>
                </div>

                {/* Right Content — Category Circles */}
                <div className="about-right">
                    {CATEGORIES.map((item, i) => (
                        <div
                            key={item.label}
                            className={`category-item reveal reveal--d${i + 1}`}
                        >
                            <div className="category-circle-outer">
                                <div className="category-circle-inner">
                                    <img
                                        src={item.img}
                                        alt={item.label}
                                        className="category-icon"
                                        width={64}
                                        height={64}
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
