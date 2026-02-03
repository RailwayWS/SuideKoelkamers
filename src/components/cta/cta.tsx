import "./cta.css";

import ctaBg from "../../assets/cta_bg.jpg";

const IconHeadset = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
    </svg>
);

export default function CtaSection() {
    return (
        <section
            className="cta-section"
            style={{ backgroundImage: `url(${ctaBg})` }}
        >
            <div className="cta-overlay"></div>

            <div className="container cta-content">
                <h2 className="cta-title">GET A FREE QUOTE</h2>

                <div className="cta-buttons">
                    <button className="cta-btn-primary" type="button">
                        BUY NOW
                    </button>
                    <button className="cta-btn-secondary" type="button">
                        <div className="icon-circle-small">
                            <IconHeadset />
                        </div>
                        MAKE A CALL
                    </button>
                </div>
            </div>
        </section>
    );
}
