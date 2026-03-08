import "./about.css";
import { useScrollReveal } from "../../hooks/useScrollReveal";

import cowImg  from "../../assets/cow.png";
import henImg  from "../../assets/hen.png";
import pigImg  from "../../assets/pig.png";
import sheepImg from "../../assets/sheep.png";

const CATEGORIES = [
    { label: "CHICKEN MEAT", img: henImg },
    { label: "PORK MEAT",    img: pigImg },
    { label: "BEEF MEAT",    img: cowImg },
    { label: "SHEEP MEAT",   img: sheepImg },
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
