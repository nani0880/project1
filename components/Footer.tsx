import React from 'react';
import { Logo } from './Home';

const SocialIcon: React.FC<{ href: string; children: React.ReactNode; delay: number }> = ({ href, children, delay }) => (
    <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="glass glass-hover p-3 rounded-full transition-all duration-300 animate-fadeInUp"
        style={{
            animationDelay: `${delay}s`,
            opacity: 0,
            animationFillMode: 'forwards'
        }}
    >
        {children}
    </a>
);

const Footer: React.FC = () => {
    return (
        <footer 
            className="relative border-t overflow-hidden"
            style={{
                borderColor: 'rgba(0, 230, 118, 0.2)',
                background: 'linear-gradient(180deg, #0A0A0A 0%, #0f0f0f 100%)'
            }}
        >
            {/* Top Glow Border */}
            <div 
                className="absolute top-0 left-0 right-0 h-1"
                style={{
                    background: 'linear-gradient(90deg, transparent, #00E676, #00D1FF, transparent)',
                    opacity: 0.5
                }}
            ></div>

            <div className="container mx-auto px-6 py-16">
                <div className="grid md:grid-cols-4 gap-12 text-center md:text-left">
                    {/* Brand Section */}
                    <div className="animate-fadeInUp" style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
                        <Logo className="h-16 mx-auto md:mx-0 mb-4" />
                        <p className="text-gray-400 mb-6" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, letterSpacing: '0.05em' }}>
                            Train. Transform. Triumph.
                        </p>
                        <div className="flex justify-center md:justify-start space-x-4">
                            <SocialIcon href="https://www.instagram.com/cfs9gym" delay={0.4}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#E4405F' }}>
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073z"/>
                                </svg>
                            </SocialIcon>
                            <SocialIcon href="https://www.facebook.com/cfs9gym" delay={0.5}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#1877F2' }}>
                                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z"/>
                                </svg>
                            </SocialIcon>
                            <SocialIcon href="https://www.youtube.com/@cfs9gym" delay={0.6}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#FF0000' }}>
                                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                                </svg>
                            </SocialIcon>
                        </div>
                    </div>

                    {/* Our Branches */}
                    <div className="animate-fadeInUp" style={{ animationDelay: '0.25s', opacity: 0, animationFillMode: 'forwards' }}>
                        <h4 className="text-2xl mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#FF0000' }}>Our Branches</h4>
                        <ul className="space-y-4">
                            <li>
                                <a 
                                    href="https://maps.google.com/?q=CFS9+Gym+Kondapur+Hyderabad"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group block"
                                >
                                    <div className="flex items-start space-x-3 text-gray-400 hover:text-white transition-all duration-300">
                                        <svg className="w-5 h-5 mt-1 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/>
                                        </svg>
                                        <div>
                                            <p className="font-semibold text-white group-hover:text-red-500 transition-colors">Kondapur</p>
                                            <p className="text-sm">Click for directions</p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="https://maps.google.com/?q=CFS9+Gym+Madhapur+Hyderabad"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group block"
                                >
                                    <div className="flex items-start space-x-3 text-gray-400 hover:text-white transition-all duration-300">
                                        <svg className="w-5 h-5 mt-1 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/>
                                        </svg>
                                        <div>
                                            <p className="font-semibold text-white group-hover:text-red-500 transition-colors">Madhapur</p>
                                            <p className="text-sm">Click for directions</p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="animate-fadeInUp" style={{ animationDelay: '0.3s', opacity: 0, animationFillMode: 'forwards' }}>
                        <h4 className="text-2xl mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#00E676' }}>Quick Links</h4>
                        <ul className="space-y-3">
                            {['About Us', 'Programs', 'Gallery', 'Contact'].map((item, index) => (
                                <li key={item}>
                                    <a 
                                        href={`#${item.toLowerCase().replace(' ', '')}`}
                                        className="text-gray-400 hover:text-white transition-all duration-300 inline-block hover:translate-x-2"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Hours */}
                    <div className="animate-fadeInUp" style={{ animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}>
                        <h4 className="text-2xl mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#00D1FF' }}>Hours</h4>
                        <ul className="space-y-3 text-gray-400">
                            <li className="flex justify-between md:justify-start md:space-x-4">
                                <span className="font-semibold text-white">Mon - Fri:</span>
                                <span>5am - 11pm</span>
                            </li>
                            <li className="flex justify-between md:justify-start md:space-x-4">
                                <span className="font-semibold text-white">Saturday:</span>
                                <span>7am - 10pm</span>
                            </li>
                            <li className="flex justify-between md:justify-start md:space-x-4">
                                <span className="font-semibold text-white">Sunday:</span>
                                <span>8am - 8pm</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div 
                    className="mt-12 pt-8 border-t text-center animate-fadeInUp"
                    style={{
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        animationDelay: '0.6s',
                        opacity: 0,
                        animationFillMode: 'forwards'
                    }}
                >
                    <p className="text-gray-500 font-light">
                        &copy; {new Date().getFullYear()} CFS9 Gym. All Rights Reserved. Built with passion for fitness.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
