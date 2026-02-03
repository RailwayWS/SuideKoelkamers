import { useState } from "react";
import "./faq.css";

import faqBg from "../../assets/faq_bg.jpg";

const IconChevron = ({ isOpen }: { isOpen: boolean }) => (
    <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s",
        }}
    >
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
);

const FAQS = [
    {
        question: "LOREM IPSUM DOLOR SIT AMET.",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        question: "CONSECTETUR ADIPISCING ELIT.",
        answer: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
        question: "SED DO EIUSMOD TEMPOR.",
        answer: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
];

export default function FaqSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setActiveIndex((prev) => (prev === index ? null : index));
    };

    return (
        <section
            className="faq-section"
            style={{ backgroundImage: `url(${faqBg})` }}
        >
            <div className="container faq-container">
                <div className="faq-right">
                    <h2
                        className="title-large"
                        style={{ textAlign: "center", marginBottom: "40px" }}
                    >
                        Frequently <span className="highlight-red">Asked</span>{" "}
                        <br />
                        Questions.
                    </h2>

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
                                >
                                    {item.question}
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
                                        <p className="faq-answer">
                                            {item.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
