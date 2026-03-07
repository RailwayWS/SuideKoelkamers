import "./cta.css";
import { useScrollReveal } from "../../hooks/useScrollReveal";

import sheep from "../../assets/sheepbackground.png";

const ETHOS_STATEMENTS = [
    {
        heading: "Customer First",
        text: "Everything we do is about you — our customer. Our motivation as a country-styled butchery stems from our passion for sourcing naturally-reared livestock and providing our customers with farm-to-table quality products.",
    },
    {
        heading: "Attention to Detail",
        text: "Care is taken every step of the way to cater for all our customer's requirements, from selecting the best cuts of meat and creating new products to preparing your order.",
    },
    {
        heading: "Small-Town Values",
        text: "Southern small-town values and friendliness, as well as exceptional service delivery, are central to who we are and how we do business.",
    },
];

export default function CtaSection() {
    const ref = useScrollReveal();

    return (
        <section
            className="cta-section"
            style={{ backgroundImage: `url(${sheep})` }}
            ref={ref}
        >
            <div className="cta-overlay"></div>

            <div className="container cta-content">
                <span className="cta-subtitle reveal">What We Believe</span>
                <h2 className="cta-title reveal reveal--d1">OUR ETHOS</h2>

                <div className="ethos-grid reveal reveal--d2">
                    {ETHOS_STATEMENTS.map((item) => (
                        <div className="ethos-card" key={item.heading}>
                            <h3 className="ethos-heading">{item.heading}</h3>
                            <p className="ethos-text">{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
