import "./footer.css";

type QuickLink = { label: string; href: string };
type HourEntry = { day: string; time: string };

const QUICK_LINKS: QuickLink[] = [
    { label: "Home",           href: "#home" },
    { label: "What We Offer",  href: "#what-we-offer" },
    { label: "Our Story",      href: "#our-story" },
    { label: "Products",       href: "#products" },
    { label: "Contact",        href: "#contact" },
];

const HOURS: HourEntry[] = [
    { day: "Monday – Friday", time: "08:00 – 17:30" },
    { day: "Saturday",         time: "08:00 – 14:00" },
    { day: "Sunday",           time: "Closed" },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const scrollTo = (href: string) => {
        if (href === "#home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            const el = document.querySelector(href);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <footer className="site-footer">
            {/* ── CTA Strip ── */}
            <div className="footer-cta-strip">
                <div className="container footer-cta-inner">
                    <p className="footer-cta-text">
                        Premium quality meat, delivered with southern Namibian hospitality.
                    </p>
                    <button
                        className="cta-button footer-cta-btn"
                        onClick={() => scrollTo("#contact")}
                    >
                        Get in Touch
                    </button>
                </div>
            </div>

            {/* ── Footer Body ── */}
            <div className="footer-body">
                <div className="container footer-grid">
                    {/* Brand Column */}
                    <div className="footer-col footer-col--brand">
                        <div className="footer-logo-badge" aria-hidden="true">SK</div>
                        <h3 className="footer-brand-name">Suide Koelkamers</h3>
                        <p className="footer-tagline">Butcher &amp; Meat Shop</p>
                        <p className="footer-about-text">
                            Family-run since 2009, serving Keetmanshoop with proudly
                            Namibian, locally-sourced meat and artisan cold meats crafted
                            with passion and tradition.
                        </p>
                        <div className="footer-socials">
                            <a
                                href="https://www.facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="footer-social-icon"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="footer-social-icon"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-col">
                        <h4 className="footer-col-title">Quick Links</h4>
                        <ul className="footer-link-list" role="list">
                            {QUICK_LINKS.map((link) => (
                                <li key={link.label}>
                                    <button
                                        className="footer-link"
                                        onClick={() => scrollTo(link.href)}
                                    >
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Trading Hours */}
                    <div className="footer-col">
                        <h4 className="footer-col-title">Trading Hours</h4>
                        <ul className="footer-hours-list" role="list">
                            {HOURS.map((h) => (
                                <li key={h.day} className="footer-hour-item">
                                    <span className="footer-hour-day">{h.day}</span>
                                    <span className={`footer-hour-time ${h.time === "Closed" ? "footer-hour-closed" : ""}`}>
                                        {h.time}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer-col">
                        <h4 className="footer-col-title">Contact</h4>
                        <address className="footer-contact-list">
                            <div className="footer-contact-item">
                                <span className="footer-contact-label">Address</span>
                                <span className="footer-contact-value">
                                    Schmiede str.<br />Keetmanshoop, Namibia
                                </span>
                            </div>
                            <div className="footer-contact-item">
                                <span className="footer-contact-label">Phone</span>
                                <span className="footer-contact-value">
                                    +264 63 222 004<br />+264 81 353 7829
                                </span>
                            </div>
                            <div className="footer-contact-item">
                                <span className="footer-contact-label">Email</span>
                                <span className="footer-contact-value">koeljohann@iway.na</span>
                            </div>
                        </address>
                    </div>
                </div>
            </div>

            {/* ── Footer Bottom ── */}
            <div className="footer-bottom">
                <div className="container footer-bottom-inner">
                    <p>&copy; {currentYear} Suide Koelkamers. All rights reserved.</p>
                    <p className="footer-bottom-flag">Proudly Namibian 🇳🇦</p>
                </div>
            </div>
        </footer>
    );
}
