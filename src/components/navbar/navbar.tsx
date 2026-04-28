import { useState, useEffect } from "react";
import "./navbar.css";

type NavLink = { label: string; href: string };

const NAV_LINKS: NavLink[] = [
    { label: "Home", href: "#home" },
    { label: "What We Offer", href: "#what-we-offer" },
    { label: "Ethos", href: "#ethos" },
    { label: "Our Story", href: "#our-story" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState("Home");
    const [menuOpen, setMenuOpen] = useState(false);

    /* Active section detection & glass effect */
    useEffect(() => {
        const sections = [
            { id: "home", label: "Home" },
            { id: "what-we-offer", label: "What We Offer" },
            { id: "ethos", label: "Ethos" },
            { id: "our-story", label: "Our Story" },
            { id: "contact", label: "Contact" },
            { id: "faq", label: "FAQ" },
        ];

        const handleScroll = () => {
            // Glass effect
            setScrolled(window.scrollY > 80);

            // Active section detection
            let currentActive = "Home";

            // The exact line on the screen we use to determine what section we are in
            const scrollThreshold = window.innerHeight * 0.4;

            for (const section of sections) {
                const el = document.getElementById(section.id);
                if (el) {
                    const rect = el.getBoundingClientRect();

                    // Check if the threshold line is vertically between the top and bottom of the element
                    if (
                        rect.top <= scrollThreshold &&
                        rect.bottom > scrollThreshold
                    ) {
                        currentActive = section.label;
                    }
                }
            }
            setActiveLink(currentActive);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Trigger initial check on load

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    /* Close menu on resize to desktop */
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) setMenuOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleLinkClick = (link: NavLink) => {
        setActiveLink(link.label);
        setMenuOpen(false);
        if (link.href === "#home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            const target = document.querySelector(link.href);
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    };

    return (
        <nav
            className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
            role="navigation"
            aria-label="Main navigation"
        >
            <div className="container nav-container">
                <div className="nav-left">
                    <div className="nav-social-icons">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Facebook"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                            </svg>
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Instagram"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
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
                                ></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line
                                    x1="17.5"
                                    y1="6.5"
                                    x2="17.51"
                                    y2="6.5"
                                ></line>
                            </svg>
                        </a>
                    </div>
                    {/* Logo — just the text, no badge */}
                    <button
                        className="nav-logo"
                        onClick={() =>
                            handleLinkClick({ label: "Home", href: "#home" })
                        }
                        aria-label="Go to top"
                    >
                        <span className="nav-logo-name">Suide Koelkamers</span>
                    </button>
                </div>

                {/* Desktop Nav Links */}
                <ul
                    className={`nav-links ${menuOpen ? "nav-open" : ""}`}
                    role="list"
                >
                    {NAV_LINKS.map((link) => (
                        <li
                            key={link.label}
                            className={
                                activeLink === link.label ? "active" : ""
                            }
                            onClick={() => handleLinkClick(link)}
                            role="listitem"
                        >
                            {link.label.toUpperCase()}
                        </li>
                    ))}
                    {/* Mobile-only Contact link */}
                    <li
                        className={`mobile-only-link ${
                            activeLink === "Contact" ? "active" : ""
                        }`}
                        onClick={() =>
                            handleLinkClick({
                                label: "Contact",
                                href: "#contact",
                            })
                        }
                        role="listitem"
                    >
                        CONTACT US
                    </li>
                </ul>

                {/* Right Side */}
                <div className="nav-right">
                    <button
                        className={`nav-cta ${scrolled ? "nav-cta--visible" : ""}`}
                        onClick={(e) => {
                            e.preventDefault();
                            handleLinkClick({
                                label: "Contact",
                                href: "#contact",
                            });
                        }}
                        aria-label="Contact us"
                    >
                        Contact Us
                    </button>

                    {/* Hamburger */}
                    <button
                        className={`hamburger ${menuOpen ? "open" : ""}`}
                        type="button"
                        aria-label="Toggle navigation"
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen((prev) => !prev)}
                    >
                        <span className="hamburger-bar" />
                        <span className="hamburger-bar" />
                        <span className="hamburger-bar" />
                    </button>
                </div>
            </div>
        </nav>
    );
}
