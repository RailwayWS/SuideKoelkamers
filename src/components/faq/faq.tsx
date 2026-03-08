import { useState } from "react";
import "./faq.css";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import faqBg from "../../assets/faq_bg.jpg";

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

const FAQS = [
    {
        question: "WHERE DO YOU SOURCE YOUR MEAT?",
        answer:
            "We source lamb and beef from local farmers across southern Namibia, where livestock is naturally reared on the region's unique natural grazing. Our pork is produced at our own OppiKoppi piggery, where we maintain stringent quality standards from farm to table.",
    },
    {
        question: "DO YOU OFFER CUSTOM CUTS AND SPECIAL ORDERS?",
        answer:
            "Absolutely. Our master butchers are happy to prepare custom cuts tailored to your specific needs — whether for a special occasion, braai, or bulk order. Simply contact us in advance so we can prepare your order to perfection.",
    },
    {
        question: "WHAT IS INCLUDED IN YOUR COLD MEAT RANGE?",
        answer:
            "Our handmade cold meat range includes salami, ham, rauchfleisch, footlongs, pork and beef russians, viennas, and jagdwurst — all crafted from 100% fresh meat with no unnecessary additives or preservatives.",
    },
    {
        question: "DO YOU HAVE A DELI AND TAKEAWAY SERVICE?",
        answer:
            "Yes! Our daily deli prepares homemade meals every day, including burgers, pizzas, braai favourites, Russians, and real hand-cut chips. It's the perfect stop for a quick, satisfying meal any day of the week.",
    },
    {
        question: "WHAT ARE YOUR TRADING HOURS?",
        answer:
            "We are open Monday to Friday from 08:00 to 17:30, and Saturdays from 08:00 to 14:00. We are closed on Sundays and public holidays. Please contact us directly for holiday trading schedules.",
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
                        Frequently <span className="highlight-red">Asked</span> Questions
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
                                    <IconChevron isOpen={activeIndex === index} />
                                </div>
                            </button>

                            <div className="faq-answer-wrapper">
                                <div className={`faq-answer-inner ${activeIndex === index ? "open" : ""}`}>
                                    <p className="faq-answer">{item.answer}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
