import { useState } from "react";
import "./faq.css";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import faqBg from "../../assets/background/faq_bg.webp";

// ── Icons ──────────────────────────────────
const IconChevron = ({ isOpen }: { isOpen: boolean }) => (
    <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
        aria-hidden="true"
    >
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

const IconPhone = () => (
    <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
);

const IconInfo = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 16v-4"></path>
        <path d="M12 8h.01"></path>
    </svg>
);

const IconOrder = () => (
    <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <path d="M16 10a4 4 0 0 1-8 0"></path>
    </svg>
);

const IconCard = () => (
    <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
        <line x1="1" y1="10" x2="23" y2="10"></line>
    </svg>
);

type FaqItem = {
    question: string;
    answer: React.ReactNode;
};

const FAQS: FaqItem[] = [
    {
        question: "PRICELIST?",
        answer: "We don’t have a pricelist available on our website as meat prices vary depending on the market. Please contact us via email or cellphone and we will assist you.",
    },
    {
        question: "We are travelling to Namibia. Can we place an order?",
        answer: (
            <>
                <p className="faq-intro">Yes, the process works as follows:</p>
                <div className="faq-process">
                    <div className="faq-step">
                        <div className="faq-step-number">
                            <IconPhone />
                        </div>
                        <div className="faq-step-content">
                            <strong>Contact Us</strong>
                            <p>
                                Send us an email, WhatsApp, or give us a call.
                            </p>
                        </div>
                    </div>
                    <div className="faq-step">
                        <div className="faq-step-number">
                            <IconInfo />
                        </div>
                        <div className="faq-step-content">
                            <strong>Receive Info</strong>
                            <p>
                                We will provide an order list with products and
                                prices.
                            </p>
                        </div>
                    </div>
                    <div className="faq-step">
                        <div className="faq-step-number">
                            <IconOrder />
                        </div>
                        <div className="faq-step-content">
                            <strong>Place Order</strong>
                            <p>
                                Place your order at least a week prior to
                                arriving. Provide the following:
                            </p>
                            <ul className="faq-step-list">
                                <li>Pick up date</li>
                                <li>
                                    Packaging instructions (e.g., 500g x 3
                                    boerewors, Beef rump 300g x 4, etc.)
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="faq-step">
                        <div className="faq-step-number">
                            <IconCard />
                        </div>
                        <div className="faq-step-content">
                            <strong>Collect & Pay</strong>
                            <p>
                                When collecting your order, you can easily swipe
                                in-store.
                            </p>
                        </div>
                    </div>
                </div>
            </>
        ),
    },

    {
        question:
            "WHAT IS THE REGULATION FOR BRINGING MEAT FROM SOUTH AFRICA TO NAMIBIA?",
        answer: "Due to the Foot-and-Mouth Disease in South Africa, all meat and animal products, including raw or cooked products, are prohibited from entering Namibia. The primary goal is to prevent the Foot-and-Mouth Disease entering the country which can have a devastating effect on the local economy, livestock industry and Namibia’s valuable export markets.",
    },
    {
        question:
            "CAN WE TAKE MEAT OVER THE BORDER WHEN TRAVELLING FROM NAMIBIA TO SOUTH AFRICA?",
        answer: "Yes, you are allowed to take 25 kg of meat per person but not more than 75 kg per car. It is recommended to keep receipts for meat bought in Namibia for border inspection. Remember to declare your meat at the South African Border.",
    },
];

export default function FaqSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);
    const ref = useScrollReveal();

    const toggleFaq = (index: number) => {
        setActiveIndex((prev) => (prev === index ? null : index));
    };

    return (
        <section
            className="faq-section"
            id="faq"
            style={{ backgroundImage: `url(${faqBg})` }}
            ref={ref}
        >
            <div className="container faq-container">
                <div className="faq-header reveal">
                    <span className="subtitle-script">Got Questions?</span>
                    <h2 className="title-large faq-title">
                        Frequently <span className="highlight-red">Asked</span>{" "}
                        Questions
                    </h2>
                </div>

                <div className="faq-list">
                    {FAQS.map((item, index) => (
                        <div
                            key={item.question}
                            className={`faq-item ${activeIndex === index ? "active" : ""}`}
                        >
                            <button
                                className="faq-question"
                                type="button"
                                onClick={() => toggleFaq(index)}
                                aria-expanded={activeIndex === index}
                            >
                                <span>{item.question}</span>
                                <div className="faq-icon-circle">
                                    <IconChevron
                                        isOpen={activeIndex === index}
                                    />
                                </div>
                            </button>

                            <div className="faq-answer-wrapper">
                                <div
                                    className={`faq-answer-inner ${activeIndex === index ? "open" : ""}`}
                                >
                                    {typeof item.answer === "string" ? (
                                        <p className="faq-answer">
                                            {item.answer}
                                        </p>
                                    ) : (
                                        <div className="faq-answer custom-layout">
                                            {item.answer}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
