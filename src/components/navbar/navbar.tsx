import { useState } from "react";
import "./navbar.css";

const NAV_LINKS = ["Home", "What we Offer", "Our Story", "Products", "Contact"];

export default function Navbar() {
    const [activeLink, setActiveLink] = useState("Home");
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLinkClick = (link: string) => {
        setActiveLink(link);
        setMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="container nav-container">
                {/* Hamburger toggle — visible only on mobile */}
                <button
                    className={`hamburger ${menuOpen ? "open" : ""}`}
                    type="button"
                    aria-label="Toggle navigation"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span className="hamburger-bar" />
                    <span className="hamburger-bar" />
                    <span className="hamburger-bar" />
                </button>

                <ul className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
                    {NAV_LINKS.map((link) => (
                        <li
                            key={link}
                            className={activeLink === link ? "active" : ""}
                            onClick={() => handleLinkClick(link)}
                        >
                            {link.toUpperCase()}
                            {activeLink === link && (
                                <span className="dot">• • •</span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
