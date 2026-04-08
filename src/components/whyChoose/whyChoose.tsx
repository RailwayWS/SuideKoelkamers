import { useState } from "react";
import "./whyChoose.css";
import { useScrollReveal } from "../../hooks/useScrollReveal";

import chooseBg from "../../assets/background/choose_bg.webp";
import titleShapeImg from "../../assets/icons/title_shape.png";

// You may need to create/update these image paths in your assets folder
import salamiImg from "../../assets/carousel/salamie.webp";
import carcassImg from "../../assets/carousel/karkas.jpeg"; // Added based on requirements
import biltongImg from "../../assets/carousel/skinkbord2.webp"; // Added based on requirements
import roosterbroodImg from "../../assets/carousel/braai.webp"; // Using braai as roosterbrood placeholder

type Feature = {
    title: string;
    shortDesc: string;
    longDesc: string;
    img: string;
};

const FEATURES: Feature[] = [
    {
        title: "Cold Meats",
        shortDesc: "Handmade cold meat from 100% pure meat.",
        longDesc:
            "Curated range includes salami*, ham, polony, jagdwurst, cheesegrillers*, russians*, viennas*, bratwurst, currywurst, rauchfleisch and black forest ham. (*Starred products available in beef and pork options).",
        img: salamiImg,
    },
    {
        title: "Fresh Local Meat",
        shortDesc: "Fresh local meat: Lamb, beef, pork, chicken.",
        longDesc:
            "To ensure succulent meat cuts, we use pork produced at our own OppiKoppi piggery, where we keep to stringent standards, and we source lamb and beef from local farmers that is reared on the unique natural grazing of southern Namibia. Our master butcher, Wikus Malan, is also a boerewors champion who won Shoprite's Boerewors Competition in 2010.",
        img: carcassImg,
    },
    {
        title: "Handmade Snacks",
        shortDesc: "Traditional handmade snacks.",
        longDesc:
            "Droëwors, biltong, chilli bites, cabanossi, biltong flaps, warmwiele, and bacon biltong.",
        img: biltongImg,
    },
    {
        title: "Daily Deli",
        shortDesc: "Our Deli offers daily homemade meals and takeaways.",
        longDesc:
            "To make life easier in the afternoons, our deli prepares homemade dishes every day. Come enjoy our tasty burgers, pizzas, braai, Russians, and real hand-cut chips.",
        img: roosterbroodImg,
    },
];

// Sub-component to handle the individual flip state of each card
const FeatureCard = ({ feature }: { feature: Feature; delay: number }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsFlipped(!isFlipped);
    };

    return (
        <div className={`feature-card ${isFlipped ? "flipped" : ""}`}>
            <div className="card-inner">
                {/* Front of the card */}
                <div
                    className="card-front"
                    style={{ backgroundImage: `url(${feature.img})` }}
                >
                    <div className="card-gradient-overlay" />
                    <div className="card-content">
                        <div className="card-text-wrapper">
                            <h3 className="card-title">{feature.title}</h3>
                            <p className="card-desc">{feature.shortDesc}</p>
                        </div>
                        <button className="card-pill-btn" onClick={handleFlip}>
                            Read more
                        </button>
                    </div>
                </div>

                {/* Back of the card */}
                <div
                    className="card-back"
                    style={{ backgroundImage: `url(${feature.img})` }}
                >
                    <div className="card-gradient-overlay card-gradient-overlay--dark" />
                    <div className="card-content">
                        <div className="card-text-wrapper">
                            <h3 className="card-title">{feature.title}</h3>
                            <p className="card-desc">{feature.longDesc}</p>
                        </div>
                        <button
                            className="card-pill-btn card-pill-btn--back"
                            onClick={handleFlip}
                        >
                            Go back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function WhyChooseSection() {
    const ref = useScrollReveal();

    return (
        <section
            className="choose-section"
            id="what-we-offer"
            style={{ backgroundImage: `url(${chooseBg})` }}
            ref={ref}
        >
            <div className="container choose-container">
                {/* Header */}
                <div className="choose-header reveal">
                    <span className="subtitle-script">Why Choose Us?</span>
                    <h2 className="title-large">What We Offer</h2>
                    <div className="scissors-separator">
                        <img
                            src={titleShapeImg}
                            alt="Section separator"
                            loading="lazy"
                        />
                    </div>
                </div>

                {/* Feature Cards Grid */}
                <div className="features-grid">
                    {FEATURES.map((feature, i) => (
                        <FeatureCard
                            key={feature.title}
                            feature={feature}
                            delay={i + 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
