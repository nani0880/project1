import React, { useEffect, useState } from 'react';
import { Logo } from './Home';

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [aboutOpen, setAboutOpen] = useState(false);

    useEffect(() => {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 24);
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '#home', label: 'Home' },
        { href: '#programs', label: 'Programs' },
        { href: '#trainers', label: 'Trainers' },
        { href: '#testimonials', label: 'Testimonials' },
        { href: '#gallery', label: 'Gallery' },
    ];

    return (
        <header className={`site-nav ${scrolled ? 'site-nav--scrolled' : ''}`}>
            <div className="site-container nav__inner">
                <a href="#home" onClick={() => setMenuOpen(false)} aria-label="CFS Home" className="nav__logo-link">
                    <img src="/CSF logo.png?v=2" alt="CFS Gym" className="nav__logo-image" loading="eager" decoding="async" />
                    <Logo />
                </a>

                <nav className="nav__links" aria-label="Primary navigation">
                    {navLinks.map(link => (
                        <a key={link.href} href={link.href} className="nav__link">
                            {link.label}
                        </a>
                    ))}

                    <div
                        className="nav__dropdown"
                        onMouseEnter={() => setAboutOpen(true)}
                        onMouseLeave={() => setAboutOpen(false)}
                    >
                        <button type="button" className="nav__dropdown-button">
                            More
                            <svg
                                className="nav__dropdown-icon"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                style={{ transform: aboutOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                            </svg>
                        </button>
                        <div className={`nav__dropdown-menu ${aboutOpen ? 'is-open' : ''}`}>
                            <a href="#about" className="nav__dropdown-link">About CFS</a>
                            <a href="#equipment" className="nav__dropdown-link">Equipment</a>
                        </div>
                    </div>

                    <a href="#contact" className="btn btn-primary nav__cta">Join now</a>
                </nav>

                <button
                    className={`nav__toggle ${menuOpen ? 'is-open' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            <div className={`nav__mobile ${menuOpen ? 'is-open' : ''}`}>
                <nav className="nav__mobile-links" aria-label="Mobile navigation">
                    {navLinks.map(link => (
                        <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
                            {link.label}
                        </a>
                    ))}
                    <a href="#about" onClick={() => setMenuOpen(false)}>About CFS</a>
                    <a href="#equipment" onClick={() => setMenuOpen(false)}>Equipment</a>
                    <a href="#contact" onClick={() => setMenuOpen(false)} className="btn btn-primary nav__mobile-cta">
                        Join now
                    </a>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
