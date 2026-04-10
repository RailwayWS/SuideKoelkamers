import "./ourStory.css";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import titleShapeImg from "../../assets/icons/title_shape.png";

const STORY_BLOCKS = [
    {
        year: "The Start 2009",
        text: "After 10 years as Principal and 6 years as Operations Manager at Klein Aus Vista Johann Swiegers had an urge to venture into business to build a something for his family and ultimately leave something behind for the next generation. He bought Suide Koelkamers a butchery in 2009.",
    },
    {
        year: "Our Mission",
        text: "His intention was to make a difference in the community by creating jobs and supporting local farmers.",
    },
    {
        year: "2020-2021",
        text: "Covid had a big impact on all industries especially the tourism sector. With our Tourism market being closed we had to look at alternative income streams. Our Deli section that offers daily meals and takeaways was then born. We also then started to make our own cold meat range inhouse. We also ventured into a different town in the South by starting Suide Vleis in Mariental to broaden our reach. Covid was tough for everyone but made us all definitely stronger.",
    },
    {
        year: "Family Run",
        text: "With Johann’s wife Christine being part of the business from day 1 and his oldest son joining in 2016 the business is now a family run business. After 16 years of hard work and building a strong foundation Johann decided in 2025 at the age of 60 to return to his passion namely education and became the principal at ‘Keetmanshoop Privaatskool’.",
    },
    {
        year: "Today",
        text: "Today we pride ourselves in catering for all our customers’ needs. From high end lodges to providing affordable food on the table for a family or lekker meat for a braai. We strive to always do ethical business and be the preferred butcher for our customers.",
    },
];

export default function OurStorySection() {
    const ref = useScrollReveal();

    return (
        <section className="story-section" id="our-story" ref={ref}>
            <div className="container story-container">
                {/* Header */}
                <div className="story-header reveal">
                    <span className="subtitle-script">Our Heritage</span>
                    <h2 className="title-large">Our Story</h2>
                    <div className="scissors-separator">
                        <img
                            src={titleShapeImg}
                            alt="Section separator"
                            loading="lazy"
                        />
                    </div>
                </div>

                {/* Timeline */}
                <div className="story-timeline">
                    {STORY_BLOCKS.map((block, i) => (
                        <div
                            key={block.year}
                            className={`story-item reveal ${i % 2 === 0 ? "reveal--left" : "reveal--right"} reveal--d${Math.min(i + 1, 5)}`}
                        >
                            <div className="story-marker">
                                <div className="story-dot" />
                            </div>
                            <div className="story-card">
                                <span className="story-year">{block.year}</span>
                                <p className="story-text">{block.text}</p>
                            </div>
                        </div>
                    ))}
                    {/* Vertical timeline line */}
                    <div className="story-line" />
                </div>
            </div>
        </section>
    );
}
