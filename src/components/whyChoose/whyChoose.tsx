import { useState } from "react";
import "./whyChoose.css";
import { useScrollReveal } from "../../hooks/useScrollReveal";

import chooseBg from "../../assets/choose_bg.jpg";
import titleShapeImg from "../../assets/title_shape.png";
import coldmeat from "../../assets/products/slag2.jpeg";

import butcheringIcon from "../../assets/butchering.png";
import fireIcon from "../../assets/fire.png";
import meatIcon from "../../assets/meat.png";
import stampImg from "../../assets/stamp.png";

type Feature = {
    title: string;
    shortDesc: string;
    longDesc: string;
    icon: string;
    iconAlt: string;
};

const FEATURES: Feature[] = [
    {
        title: "Fresh, Local Meat",
        shortDesc:
            "Premium local meat from farm to table, including our award-winning 2010 boerewors.",
        longDesc:
            "To ensure succulent meat cuts, we use pork produced at our own OppiKoppi piggery, where we keep to stringent standards, and we source lamb and beef from local farmers that is reared on the unique natural grazing of southern Namibia. Our master butcher, Wikus Malan, is also a boerewors champion who won Shoprite's Boerewors Competition in 2010.",
        icon: butcheringIcon,
        iconAlt: "Butchering",
    },
    {
        title: "Fresh Cold Meats",
        shortDesc: "Handcrafted cured meat products made from 100% fresh meat.",
        longDesc:
            "We pride ourselves in our specialty products such as our handmade curated cold meat range, which includes salami, ham, rauchfleisch, footlongs, pork and beef russians, viennas and jagdwurst — all made from 100% fresh meat with no unnecessary additives.",
        icon: meatIcon,
        iconAlt: "Meat",
    },
    {
        title: "Daily Deli",
        shortDesc:
            "A deli packed with fresh, homemade meals and takeaways to make your afternoons easier.",
        longDesc:
            "To make life easier in the afternoons, our deli prepares homemade dishes every day. Come enjoy our tasty burgers, pizzas, braai favourites, Russians, and real hand-cut chips.",
        icon: fireIcon,
        iconAlt: "Fire",
    },
];

// Sub-component to handle the individual flip state of each card
const FeatureCard = ({ feature }: { feature: Feature; delay: number }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setIsFlipped(!isFlipped);
    };

    return (
        <div className={`feature-card ${isFlipped ? "flipped" : ""}`}>
            <div className="card-inner">
                {/* Front of the card */}
                <div className="card-front">
                    <div className="card-icon-circle">
                        <img
                            src={feature.icon}
                            alt={feature.iconAlt}
                            className="feature-icon"
                        />
                    </div>
                    <h3 className="card-title">{feature.title}</h3>
                    <p className="card-desc">{feature.shortDesc}</p>
                    <a href="#" className="card-link" onClick={handleFlip}>
                        LEARN MORE
                    </a>
                </div>

                {/* Back of the card */}
                <div className="card-back">
                    <h3 className="card-title">{feature.title}</h3>
                    <p className="card-desc">{feature.longDesc}</p>
                    <a href="#" className="card-link" onClick={handleFlip}>
                        GO BACK
                    </a>
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
                    <span className="subtitle-script">What we Offer</span>
                    <h2 className="title-large">Why Choose Us?</h2>
                    <div className="scissors-separator">
                        <img src={titleShapeImg} alt="Section separator" />
                    </div>
                </div>

                {/* Central Content */}
                
                {/* Featured Product Banner Moved from Products and Redesigned */}
                <div className="featured-product reveal reveal--scale reveal--d1">
                    <div className="featured-content-left">
                        <span className="featured-badge subtitle-script">Artisan Deli &amp; Cold Meats</span>
                        <h3 className="featured-title">Our Signature Handmade Cold Meats</h3>
                        <p className="featured-text">
                            Experience the authentic taste of tradition with our 100% in-house handmade cold meats. 
                            Crafted locally from the finest quality cuts using time-honored traditional methods, 
                            our artisanal preparation ensures a premium, rich flavor you simply won't find at standard butcheries. 
                            Taste the true difference of passion and craftsmanship.
                        </p>
                    </div>
                    
                    <div className="featured-image-right">
                        {/* Placeholder for charcuterie image */}
                        <img 
                           src={coldmeat} 
                           alt="Handmade Cold Meats" 
                           className="featured-charcuterie-img" 
                        />
                        {/* Quality Stamp */}
                        <img src={stampImg} alt="100% Handmade Local Quality" className="quality-seal" />
                    </div>
                </div>

                {/* Feature Cards Grid */}
                <div className="features-grid">
                    {FEATURES.map((feature, i) => (
                        <FeatureCard key={feature.title} feature={feature} delay={i + 1} />
                    ))}
                </div>
            </div>
        </section>
    );
}
