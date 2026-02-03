import { useState } from "react";
import "./navbar.css";

const NAV_LINKS = ["Home", "About Us", "Products", "Blog", "Pages", "Contact"];

export default function Navbar() {
    const [activeLink, setActiveLink] = useState("Home");

    return (
        <nav className="navbar">
            <div className="container nav-container">
                <ul className="nav-links">
                    {NAV_LINKS.map((link) => (
                        <li
                            key={link}
                            className={activeLink === link ? "active" : ""}
                            onClick={() => setActiveLink(link)}
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
