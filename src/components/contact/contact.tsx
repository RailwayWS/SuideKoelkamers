import { useState, type FormEvent } from "react";
import "./contact.css";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import koelkamersLogo from "../../assets/logos/koelkamers-logo-1.png";
import vleisLogo from "../../assets/logos/vleis-logo-1.png";

export default function ContactSection() {
    const [result, setResult] = useState("");
    const ref = useScrollReveal();

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setResult("Sending....");
        const formElement = event.currentTarget;
        const formData = new FormData(formElement);
        formData.append("access_key", "212cfce5-ca17-4bd4-ac0f-ef0d4e205a56");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (data.success) {
                setResult("Message Sent ✓");
                formElement.reset();
                setTimeout(() => setResult(""), 4000);
            } else {
                setResult("Error Sending Message");
            }
        } catch (error) {
            setResult("Failed to Send Message");
        }
    };

    return (
        <section className="contact-section" id="contact" ref={ref}>
            <div className="container contact-container">
                {/* Header */}
                <div className="contact-header reveal">
                    <span className="contact-subtitle">Get In Touch</span>
                    <h2 className="contact-title">
                        Contact <span className="highlight-red">Us</span>
                    </h2>
                    <p className="contact-desc">
                        Order ahead of time and your order will be waiting for
                        you.
                    </p>
                </div>

                {/* Branches */}
                <div className="contact-branches">
                    {/* Left: Suide Koelkamers */}
                    <div className="branch-card reveal reveal--left reveal--d1">
                        <div className="branch-card__header">
                            <img
                                src={koelkamersLogo}
                                alt="Suide Koelkamers Logo"
                                className="branch-card__logo"
                            />
                            <h3 className="branch-card__title">Keetmanshoop</h3>
                        </div>

                        <div className="branch-grid">
                            <div className="info-card">
                                <div className="info-icon">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                </div>
                                <div className="info-text">
                                    <span className="info-label">
                                        Phone Numbers
                                    </span>
                                    <span className="info-value">
                                        +264 81 247 6318 [Chistine]
                                    </span>
                                    <span className="info-value">
                                        +264 81 743 9047 [Mieke]
                                    </span>
                                    <span className="info-value">
                                        +264 63 222 004 [Landline]
                                    </span>
                                </div>
                            </div>

                            <div className="info-card">
                                <div className="info-icon">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                </div>
                                <div className="info-text">
                                    <span className="info-label">
                                        Email Addresses
                                    </span>
                                    <span className="info-value">
                                        stiena@iway.na
                                    </span>
                                </div>
                            </div>

                            <div className="contact-map">
                                <iframe
                                    title="Suide Koelkamers Location"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2235.9810690213712!2d18.13138864575164!3d-26.575792662341083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1c168347addf2481%3A0x894d5db09ba64125!2sSuide%20Koelkamers!5e1!3m2!1sen!2sza!4v1775632372214!5m2!1sen!2sza"
                                    width="100%"
                                    height="250"
                                    style={{ border: 0, borderRadius: "12px" }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right: Suide Vleis (copy same info for now) */}
                    <div className="branch-card reveal reveal--right reveal--d2">
                        <div className="branch-card__header">
                            <img
                                src={vleisLogo}
                                alt="Suide Vleis Logo"
                                className="branch-card__logo"
                            />
                            <h3 className="branch-card__title">Mariental</h3>
                        </div>

                        <div className="branch-grid">
                            <div className="info-card">
                                <div className="info-icon">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                </div>
                                <div className="info-text">
                                    <span className="info-label">
                                        Phone Numbers
                                    </span>
                                    <span className="info-value">
                                        +264 81 247 6318 [Chistine]
                                    </span>
                                    <span className="info-value">
                                        +264 81 743 9047 [Mieke]
                                    </span>
                                    <span className="info-value">
                                        +264 63 247 785 [Landline]
                                    </span>
                                </div>
                            </div>

                            <div className="info-card">
                                <div className="info-icon">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                </div>
                                <div className="info-text">
                                    <span className="info-label">
                                        Email Addresses
                                    </span>
                                    <span className="info-value">
                                        stiena@iway.na
                                    </span>
                                </div>
                            </div>

                            <div className="contact-map">
                                <iframe
                                    title="Suide Vleis Location"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1059069.0000129363!2d17.386249915105566!3d-25.59840156835002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1c12013407a5de3d%3A0x52bfdaf502decefb!2sSuide%20Vleis%20Butchery!5e1!3m2!1sen!2sza!4v1775632413478!5m2!1sen!2sza"
                                    width="100%"
                                    height="250"
                                    style={{ border: 0, borderRadius: "12px" }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom row: Social + Contact Form */}
                <div className="contact-bottom">
                    <div className="social-card reveal reveal--d3">
                        <span className="social-card-label">Social Media</span>
                        <div className="social-links">
                            <a
                                href="https://www.facebook.com/share/18j6pK4xs3/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                                aria-label="Facebook"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                                <span>Facebook</span>
                            </a>

                            <a
                                href="https://www.instagram.com/suide_vleishuis?igsh=YWUyMWU2Zjg0Mnpn"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                                aria-label="Instagram"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect
                                        x="2"
                                        y="2"
                                        width="20"
                                        height="20"
                                        rx="5"
                                        ry="5"
                                    />
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                    <line
                                        x1="17.5"
                                        y1="6.5"
                                        x2="17.51"
                                        y2="6.5"
                                    />
                                </svg>
                                <span>Instagram</span>
                            </a>
                        </div>
                    </div>

                    <form
                        className="contact-form reveal reveal--d4"
                        onSubmit={onSubmit}
                    >
                        <div className="contact-form__header">
                            <span className="contact-form__kicker">
                                Send a message
                            </span>
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                required
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                required
                                className="form-input"
                            />
                        </div>
                        <div className="form-group form-group--grow">
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                required
                                rows={8}
                                className="form-input form-textarea"
                            />
                        </div>
                        <button
                            type="submit"
                            className="contact-submit"
                            disabled={result === "Sending...."}
                        >
                            {result || "Send Message"}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
