import React, { useState, useEffect } from 'react';
import { Logo } from './Home';

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <a 
        href={href} 
        className="relative text-white hover:text-red-500 transition-colors duration-300 px-4 py-2 text-lg font-medium group"
    >
        {children}
        <span 
            className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
            style={{ backgroundColor: '#FF0000' }}
        ></span>
    </a>
);

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: "#home", label: "Home" },
        { href: "#programs", label: "Programs" },
        { href: "#gallery", label: "Gallery" },
        { href: "#contact", label: "Contact" },
    ];

    return (
        <header 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled ? 'glass py-3' : 'bg-transparent py-5'
            }`}
            style={{
                backdropFilter: scrolled ? 'blur(10px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(255, 0, 0, 0.3)' : 'none',
                boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.5)' : 'none'
            }}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <a href="#home" className="transform hover:scale-105 transition-transform duration-300">
                    <img 
                        src="/logo.png" 
                        alt="CFS9 Gym Logo" 
                        className="h-12 md:h-14 w-auto"
                        style={{
                            filter: scrolled ? 'drop-shadow(0 0 10px rgba(255, 0, 0, 0.5))' : 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))',
                            transition: 'filter 0.3s ease'
                        }}
                    />
                </a>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center space-x-2">
                    {navLinks.map(link => (
                        <NavLink key={link.href} href={link.href}>{link.label}</NavLink>
                    ))}
                    
                    {/* About Dropdown */}
                    <div 
                        className="relative"
                        onMouseEnter={() => setAboutDropdownOpen(true)}
                        onMouseLeave={() => setAboutDropdownOpen(false)}
                    >
                        <button 
                            className="relative text-white hover:text-red-500 transition-colors duration-300 px-4 py-2 text-lg font-medium group flex items-center"
                        >
                            About
                            <svg 
                                className="w-4 h-4 ml-1 transition-transform duration-300"
                                style={{ transform: aboutDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                            <span 
                                className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                                style={{ backgroundColor: '#FF0000' }}
                            ></span>
                        </button>
                        
                        {/* Dropdown Menu */}
                        <div 
                            className="absolute top-full left-0 mt-2 w-56 glass rounded-lg overflow-hidden transition-all duration-300"
                            style={{
                                opacity: aboutDropdownOpen ? 1 : 0,
                                visibility: aboutDropdownOpen ? 'visible' : 'hidden',
                                transform: aboutDropdownOpen ? 'translateY(0)' : 'translateY(-10px)',
                                boxShadow: '0 10px 40px rgba(255, 0, 0, 0.3)',
                            }}
                        >
                            <a 
                                href="#about" 
                                className="block px-6 py-3 text-white hover:bg-red-500/20 hover:text-red-500 transition-all duration-300"
                            >
                                About CFS9
                            </a>
                            <a 
                                href="#founder" 
                                className="block px-6 py-3 text-white hover:bg-red-500/20 hover:text-red-500 transition-all duration-300 border-t border-white/10"
                            >
                                About Our Founder
                            </a>
                        </div>
                    </div>
                    
                    <a 
                        href="#contact" 
                        className="ml-4 px-6 py-2 rounded-full font-bold transition-all duration-300 hover:scale-105"
                        style={{
                            backgroundColor: '#FF0000',
                            color: '#FFFFFF',
                            boxShadow: '0 0 20px rgba(255, 0, 0, 0.5)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 0, 0, 0.8)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 0, 0, 0.5)';
                        }}
                    >
                        JOIN NOW
                    </a>
                </nav>

                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden z-50 relative w-8 h-8 flex flex-col justify-center items-center"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span 
                        className="w-6 h-0.5 transition-all duration-300 absolute"
                        style={{
                            transform: menuOpen ? 'rotate(45deg)' : 'translateY(-6px)',
                            backgroundColor: menuOpen ? '#FF0000' : '#fff'
                        }}
                    ></span>
                    <span 
                        className="w-6 h-0.5 bg-white transition-all duration-300"
                        style={{
                            opacity: menuOpen ? 0 : 1
                        }}
                    ></span>
                    <span 
                        className="w-6 h-0.5 transition-all duration-300 absolute"
                        style={{
                            transform: menuOpen ? 'rotate(-45deg)' : 'translateY(6px)',
                            backgroundColor: menuOpen ? '#FF0000' : '#fff'
                        }}
                    ></span>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div 
                className={`fixed inset-0 transition-all duration-500 md:hidden ${
                    menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                style={{
                    background: 'rgba(10, 10, 10, 0.98)',
                    backdropFilter: 'blur(20px)'
                }}
            >
                <nav className="flex flex-col items-center justify-center h-full space-y-8">
                    {navLinks.map((link, index) => (
                        <a 
                            key={link.href} 
                            href={link.href} 
                            onClick={() => setMenuOpen(false)} 
                            className="text-white hover:text-red-500 transition-all duration-300 text-4xl font-bold animate-fadeInUp"
                            style={{
                                animationDelay: `${index * 0.1}s`,
                                opacity: menuOpen ? 1 : 0,
                                animationFillMode: 'forwards'
                            }}
                        >
                            {link.label}
                        </a>
                    ))}
                    <a 
                        href="#about" 
                        onClick={() => setMenuOpen(false)} 
                        className="text-white hover:text-red-500 transition-all duration-300 text-4xl font-bold animate-fadeInUp"
                        style={{
                            animationDelay: '0.4s',
                            opacity: menuOpen ? 1 : 0,
                            animationFillMode: 'forwards'
                        }}
                    >
                        About CFS9
                    </a>
                    <a 
                        href="#founder" 
                        onClick={() => setMenuOpen(false)} 
                        className="text-white hover:text-red-500 transition-all duration-300 text-4xl font-bold animate-fadeInUp"
                        style={{
                            animationDelay: '0.5s',
                            opacity: menuOpen ? 1 : 0,
                            animationFillMode: 'forwards'
                        }}
                    >
                        About Our Founder
                    </a>
                    <a 
                        href="#contact" 
                        onClick={() => setMenuOpen(false)} 
                        className="mt-8 px-10 py-4 rounded-full font-bold text-2xl animate-fadeInUp transition-all duration-300"
                        style={{
                            backgroundColor: '#FF0000',
                            color: '#FFFFFF',
                            boxShadow: '0 0 20px rgba(255, 0, 0, 0.5)',
                            animationDelay: '0.6s',
                            opacity: menuOpen ? 1 : 0,
                            animationFillMode: 'forwards'
                        }}
                    >
                        JOIN NOW
                    </a>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
