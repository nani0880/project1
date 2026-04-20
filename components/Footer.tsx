import React from 'react';
import { Logo } from './Home';

const Footer: React.FC = () => {
    const quickLinks = [
        { label: 'About', href: '#about' },
        { label: 'Programs', href: '#programs' },
        { label: 'Trainers', href: '#trainers' },
        { label: 'Gallery', href: '#gallery' },
        { label: 'Contact', href: '#contact' }
    ];

    return (
        <footer className="footer">
            <div className="site-container footer__grid">
                <div className="footer__brand">
                    <Logo />
                    <p>Train. Transform. Triumph.</p>
                    <div className="footer__social">
                        <a className="footer__icon" href="https://www.instagram.com/cfs9gym" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073z"/>
                            </svg>
                        </a>
                        <a className="footer__icon" href="https://www.facebook.com/cfs9gym" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z"/>
                            </svg>
                        </a>
                        <a className="footer__icon" href="https://www.youtube.com/@cfs9gym" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                            </svg>
                        </a>
                    </div>
                </div>

                <div>
                    <div className="footer__title">Location</div>
                    <div className="footer__list">
                        <a href="https://maps.google.com/?q=CFS9+Gym+Jubilee+Hills+Hyderabad" target="_blank" rel="noopener noreferrer">Jubilee Hills, Hyderabad</a>
                    </div>
                </div>

                <div>
                    <div className="footer__title">Quick links</div>
                    <div className="footer__list">
                        {quickLinks.map((item) => (
                            <a key={item.label} href={item.href}>{item.label}</a>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="footer__title">Hours</div>
                    <div className="footer__list">
                        <span>Mon - Fri: 5am - 11pm</span>
                        <span>Saturday: 7am - 10pm</span>
                        <span>Sunday: 8am - 8pm</span>
                    </div>
                </div>
            </div>

            <div className="site-container footer__bar">
                <p>&copy; {new Date().getFullYear()} CFS9 Gym. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
