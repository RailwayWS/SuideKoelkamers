import "./whyChoose.css";

import chooseBg from "../../assets/choose_bg.jpg";
import chooseImg from "../../assets/choose_img.png";
import titleShapeImg from "../../assets/title_shape.png";

import butcheringIcon from "../../assets/butchering.png";
import fireIcon from "../../assets/fire.png";
import meatIcon from "../../assets/meat.png";

const FEATURES = [
    {
        title: "Lorem Ipsum",
        desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vehicula.",
        icon: butcheringIcon,
        iconAlt: "Butchering",
    },
    {
        title: "Lorem Ipsum",
        desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vehicula.",
        icon: fireIcon,
        iconAlt: "Fire",
    },
    {
        title: "lorem Ipsum",
        desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vehicula.",
        icon: meatIcon,
        iconAlt: "Meat",
    },
];

export default function WhyChooseSection() {
    return (
        <section
            className="choose-section"
            style={{ backgroundImage: `url(${chooseBg})` }}
        >
            <div className="container choose-container">
                {/* Header */}
                <div className="choose-header">
                    <span className="subtitle-script">
                        About Suide Koelkamers
                    </span>
                    <h2 className="title-large">Why Choose Our Shop</h2>
                    <div className="scissors-separator">
                        <img src={titleShapeImg} alt="Section separator" />
                    </div>
                </div>

                {/* Central Content */}
                <div className="choose-center">
                    <img
                        src={chooseImg}
                        alt="Cutting Board Meat"
                        className="cutting-board-img"
                    />
                </div>

                {/* Feature Cards */}
                <div className="features-grid">
                    {FEATURES.map((feature) => (
                        <div key={feature.title} className="feature-card">
                            <div className="card-icon-circle">
                                <img
                                    src={feature.icon}
                                    alt={feature.iconAlt}
                                    className="feature-icon"
                                />
                            </div>
                            <h3 className="card-title">{feature.title}</h3>
                            <p className="card-desc">{feature.desc}</p>
                            <a href="#" className="card-link">
                                LEARN MORE
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
