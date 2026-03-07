import { useState, type FormEvent } from "react";
import "./contact.css";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function ContactSection() {
    const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const ref = useScrollReveal();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
        setForm({ name: "", email: "", phone: "", message: "" });
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
                        Have a question or want to place an order? Reach out to us
                        and we'll get back to you as soon as possible.
                    </p>
                </div>

                <div className="contact-body">
                    {/* Left Column: Social + Form */}
                    <div className="contact-left reveal reveal--left reveal--d1">
                        <div className="social-card">
                            <span className="social-card-label">Visit Our Social Media Pages</span>
                            <div className="social-links">
                                <a
                                    href="https://www.facebook.com"
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
                                    href="https://www.instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link"
                                    aria-label="Instagram"
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                    </svg>
                                    <span>Instagram</span>
                                </a>
                            </div>
                        </div>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="form-input"
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number"
                                    value={form.phone}
                                    onChange={handleChange}
                                    className="form-input"
                                />
                            </div>
                        </div>
                        <div className="form-group form-group--grow">
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                value={form.message}
                                onChange={handleChange}
                                required
                                rows={8}
                                className="form-input form-textarea"
                            />
                        </div>
                        <button type="submit" className="contact-submit">
                            {submitted ? "Message Sent ✓" : "Send Message"}
                        </button>
                    </form>
                    </div>

                    {/* Info + Map */}
                    <div className="contact-info-side reveal reveal--right reveal--d2">
                        <div className="contact-info-cards">
                            <div className="info-card">
                                <div className="info-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                </div>
                                <div className="info-text">
                                    <span className="info-label">Phone</span>
                                    <span className="info-value">+264 63 222 004</span>
                                    <span className="info-value">+264 81 353 7829</span>
                                </div>
                            </div>
                            <div className="info-card">
                                <div className="info-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                                </div>
                                <div className="info-text">
                                    <span className="info-label">Email</span>
                                    <span className="info-value">koeljohann@iway.na</span>
                                    <span className="info-value">stiena@iway.na</span>
                                </div>
                            </div>
                            <div className="info-card">
                                <div className="info-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                                </div>
                                <div className="info-text">
                                    <span className="info-label">Address</span>
                                    <span className="info-value">Schmiede str. Keetmanshoop, Namibia</span>
                                </div>
                            </div>
                        </div>

                        <div className="contact-map">
                            <iframe
                                title="Suide Koelkamers Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.1!2d18.1306!3d-26.5831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1c43e51d8c1e4e3b%3A0x0!2sKeetmanshoop%2C+Namibia!5e0!3m2!1sen!2sna!4v1709000000000"
                                width="100%"
                                height="250"
                                style={{ border: 0, borderRadius: "12px" }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                            <a
                                href="https://maps.app.goo.gl/4y3KeDubayK5GbBP8"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="map-link"
                            >
                                Open in Google Maps →
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
