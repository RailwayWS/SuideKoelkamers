import { useState, useEffect } from "react";
import "./navbar.css";

type NavLink = { label: string; href: string };

const NAV_LINKS: NavLink[] = [
    { label: "Home", href: "#home" },
    { label: "What we Offer", href: "#what-we-offer" },
    { label: "Our Story", href: "#our-story" },
    { label: "Products", href: "#products" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState("Home");
    const [menuOpen, setMenuOpen] = useState(false);

    /* Scroll-to-glass effect */
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    /* Active section detection */
    useEffect(() => {
        const sectionMap: Record<string, string> = {
            home: "Home",
            "what-we-offer": "What we Offer",
            "our-story": "Our Story",
            products: "Products",
            contact: "Contact",
        };

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        const label = sectionMap[entry.target.id];
                        if (label) setActiveLink(label);
                    }
                }
            },
            { threshold: 0.35 }
        );

        Object.keys(sectionMap).forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
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
            if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`} role="navigation" aria-label="Main navigation">
            <div className="container nav-container">
                {/* Logo — just the text, no badge */}
                <button
                    className="nav-logo"
                    onClick={() => handleLinkClick({ label: "Home", href: "#home" })}
                    aria-label="Go to top"
                >
                    <span className="nav-logo-name">Suide Koelkamers</span>
                </button>

                {/* Desktop Nav Links */}
                <ul className={`nav-links ${menuOpen ? "nav-open" : ""}`} role="list">
                    {NAV_LINKS.map((link) => (
                        <li
                            key={link.label}
                            className={activeLink === link.label ? "active" : ""}
                            onClick={() => handleLinkClick(link)}
                            role="listitem"
                        >
                            {link.label.toUpperCase()}
                        </li>
                    ))}
                </ul>

                {/* Right Side */}
                <div className="nav-right">
                    <button
                        className={`nav-cta ${scrolled ? "nav-cta--visible" : ""}`}
                        onClick={() => handleLinkClick({ label: "Contact", href: "#contact" })}
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
