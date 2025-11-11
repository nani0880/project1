import React, { useEffect, useState, useRef } from 'react';

const PageTransition: React.FC = () => {
    const [activeSection, setActiveSection] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const sectionsRef = useRef<HTMLElement[]>([]);
    const lastScrollTime = useRef(Date.now());

    useEffect(() => {
        const sections = Array.from(document.querySelectorAll('section')) as HTMLElement[];
        sectionsRef.current = sections;

        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const now = Date.now();
                    
                    // Throttle transitions to prevent too many triggers
                    if (now - lastScrollTime.current < 1500) {
                        ticking = false;
                        return;
                    }

                    const scrollPosition = window.scrollY + window.innerHeight / 2;
                    
                    sections.forEach((section, index) => {
                        const rect = section.getBoundingClientRect();
                        const sectionTop = rect.top + window.scrollY;
                        const sectionBottom = sectionTop + rect.height;
                        
                        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                            if (index !== activeSection) {
                                lastScrollTime.current = now;
                                setIsTransitioning(true);
                                setActiveSection(index);
                                
                                setTimeout(() => {
                                    setIsTransitioning(false);
                                }, 800);
                            }
                        }
                    });
                    
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [activeSection]);

    return (
        <>
            {/* Cult.fit Style Transition Overlay */}
            {isTransitioning && (
                <div
                    className="page-transition-overlay"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none',
                        zIndex: 9999,
                        animation: 'pageTransitionSweep 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                >
                    {/* Main Gradient Sweep */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(135deg, #FFFFFF 0%, #FF0000 50%, #FFFFFF 100%)',
                            opacity: 0.95,
                            animation: 'sweepDiagonal 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
                        }}
                    />
                </div>
            )}

            {/* Section Indicators - Navigation Dots */}
            <div
                style={{
                    position: 'fixed',
                    right: '30px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                }}
            >
                {sectionsRef.current.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            sectionsRef.current[index]?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        style={{
                            width: activeSection === index ? '12px' : '8px',
                            height: activeSection === index ? '12px' : '8px',
                            borderRadius: '50%',
                            border: '2px solid rgba(255, 255, 255, 0.5)',
                            background: activeSection === index ? '#FF0000' : 'transparent',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: activeSection === index ? '0 0 10px #FF0000' : 'none',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.3)';
                            e.currentTarget.style.borderColor = '#FF0000';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                        }}
                    />
                ))}
            </div>

            <style>{`
                @keyframes pageTransitionSweep {
                    0% {
                        clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
                    }
                    50% {
                        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
                    }
                    100% {
                        clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
                    }
                }

                @keyframes sweepDiagonal {
                    0% {
                        transform: translateX(-100%) translateY(-100%) scale(1.5);
                    }
                    100% {
                        transform: translateX(100%) translateY(100%) scale(1.5);
                    }
                }
            `}</style>
        </>
    );
};

export default PageTransition;
