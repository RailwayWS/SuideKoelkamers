import "./ourStory.css";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import titleShapeImg from "../../assets/title_shape.png";

const STORY_BLOCKS = [
    {
        year: "The Beginning",
        text: "Our story begins in south-western Namibia where Johann grew up on a farm bordering the Namib Desert. It was here that he learned strong family values and the importance of ethical farming practices.",
    },
    {
        year: "2009",
        text: "A former school principal and operations manager of Klein-Aus Vista Lodge, Johann began his own business venture in 2009, doing what came naturally to him after a childhood spent on the family farm.",
    },
    {
        year: "Community",
        text: "His intention was to make a difference to the Keetmanshoop community by providing locally-sourced and naturally-reared meat at an affordable price, supporting the local farmers of the area. The business is family-run, with the second generation continuing the tradition of offering top-notch quality and service.",
    },
    {
        year: "Pride",
        text: "The Swiegers family takes pride in providing a purely-Namibian product, to both locals and tourists, ensuring a quality product that competes well in the international arena.",
    },
    {
        year: "Hospitality",
        text: "We enjoy bringing people, cultures and families together for good food around a braai or a dinner table. After all, that's what Namibian hospitality is all about.",
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
                    <h2 className="title-large">
                        Our Story
                    </h2>
                    <div className="scissors-separator">
                        <img src={titleShapeImg} alt="Section separator" />
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
