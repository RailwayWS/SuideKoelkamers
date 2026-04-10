import "./cta.css";
import { useScrollReveal } from "../../hooks/useScrollReveal";

import sheep from "../../assets/background/sheepbackground.webp";

const ETHOS_STATEMENTS = [
    {
        heading: "Everything we do is for you- our customer",
        text: "Southern small-town values and friendliness, as well as exceptional service delivery are central to who we are and how we do business. Taking care of every step in the process from sourcing naturally reared livestock to selecting the best cuts and preparing your order is what drives us everyday. ",
    },
];

export default function CtaSection() {
    const ref = useScrollReveal();

    return (
        <section
            className="cta-section"
            id="ethos"
            style={{ backgroundImage: `url(${sheep})` }}
            ref={ref}
        >
            <div className="cta-overlay"></div>

            <div className="container cta-content">
                <h2 className="cta-title reveal reveal--d1">OUR ETHOS</h2>

                <div className="ethos-single reveal reveal--d2">
                    <div className="ethos-card">
                        <h3 className="ethos-heading">
                            {ETHOS_STATEMENTS[0].heading}
                        </h3>
                        <p className="ethos-text">{ETHOS_STATEMENTS[0].text}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
