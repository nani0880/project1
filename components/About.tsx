import React, { useState, useEffect, useRef } from 'react';

const StatCounter: React.FC<{ end: number; label: string; delay: number }> = ({ end, label, delay }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    let start = 0;
                    const duration = 2000;
                    const increment = end / (duration / 16);
                    
                    const timer = setInterval(() => {
                        start += increment;
                        if (start >= end) {
                            setCount(end);
                            clearInterval(timer);
                        } else {
                            setCount(Math.floor(start));
                        }
                    }, 16);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [end, hasAnimated]);

    return (
        <div 
            ref={ref}
            className="p-6 text-center animate-scaleIn transition-all duration-300"
            style={{ 
                animationDelay: `${delay}s`, 
                opacity: 0, 
                animationFillMode: 'forwards'
            }}
        >
            <div className="text-5xl font-black mb-2" style={{ color: '#FF0000', textShadow: '0 0 30px rgba(255, 0, 0, 0.8), 0 2px 8px rgba(0,0,0,0.8)' }}>
                {count}+
            </div>
            <div className="text-white font-medium" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>{label}</div>
        </div>
    );
};

const Feature: React.FC<{ icon: string; title: string; description: string; delay: number }> = ({ icon, title, description, delay }) => (
    <div 
        className="p-6 flex items-start space-x-4 animate-fadeInLeft transition-all duration-300"
        style={{ 
            animationDelay: `${delay}s`, 
            opacity: 0, 
            animationFillMode: 'forwards'
        }}
    >
        <div className="text-4xl flex-shrink-0">
            {icon}
        </div>
        <div>
            <h4 className="text-xl font-bold text-white mb-2" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>{title}</h4>
            <p className="text-white leading-relaxed" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>{description}</p>
        </div>
    </div>
);

const About: React.FC = () => {
    const [scrollY, setScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                const scrollProgress = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));
                setScrollY(scrollProgress * 50);
            }
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    // Only trigger once when scrolling into view
                    setIsVisible(true);
                    // Ensure video plays when section is visible
                    if (videoRef.current) {
                        videoRef.current.play().catch(() => {
                            console.log('Video autoplay failed');
                        });
                    }
                }
            },
            { 
                threshold: 0.3,
                rootMargin: '-100px 0px'
            }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        window.addEventListener('scroll', handleScroll);

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section 
            id="about" 
            ref={sectionRef} 
            className="relative min-h-screen py-20 md:py-32 overflow-hidden"
            style={{ backgroundColor: '#0A0A0A' }}
        >
            {/* Background Video - More visible */}
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                    filter: 'brightness(0.6)',
                    transform: `translateY(${scrollY}px)`
                }}
                onLoadedData={() => {
                    console.log('Video loaded successfully');
                }}
                onError={(e) => {
                    console.log('Video failed to load, trying next source');
                }}
            >
                {/* Your local video - primary source */}
                <source src="/about-video.mp4" type="video/mp4" />
                {/* Fallback online videos if local video doesn't load */}
                <source src="https://cdn.pixabay.com/video/2022/11/07/138570-768834088_large.mp4" type="video/mp4" />
                <source src="https://videos.pexels.com/video-files/3766204/3766204-uhd_2560_1440_25fps.mp4" type="video/mp4" />
            </video>
            
            {/* Fallback Background Image */}
            <div 
                className="absolute inset-0"
                style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transform: `translateY(${scrollY}px)`,
                    filter: 'brightness(0.6)',
                    zIndex: -1
                }}
            ></div>
            
            {/* Lighter Overlay for better video visibility */}
            <div className="absolute inset-0 bg-black/20"></div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header with Letter Animation */}
                <div className="text-center mb-16">
                    <h2 className="text-6xl md:text-8xl font-black tracking-tight mb-4">
                        {'ABOUT '.split('').map((letter, index) => (
                            <span
                                key={`about-${index}`}
                                className="inline-block"
                                style={{
                                    color: '#FFFFFF',
                                    textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                                    transition: `all 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${0.1 + index * 0.1}s`
                                }}
                            >
                                {letter === ' ' ? '\u00A0' : letter}
                            </span>
                        ))}
                        {'CFS9'.split('').map((letter, index) => (
                            <span
                                key={`cfs9-${index}`}
                                className="inline-block"
                                style={{
                                    color: '#FF0000',
                                    textShadow: '0 0 30px rgba(255, 0, 0, 0.8), 0 2px 8px rgba(0,0,0,0.8)',
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.5)',
                                    transition: `all 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${0.7 + index * 0.15}s`
                                }}
                            >
                                {letter}
                            </span>
                        ))}
                    </h2>
                    <p className="text-xl text-white max-w-3xl mx-auto mb-4">
                        {'Best Gym in Hyderabad – Kondapur & Madhapur | Personal Training, Group Classes, Weight Loss, Modern Equipment – CFS9 Gym'.split(' ').map((word, index) => (
                            <span
                                key={index}
                                className="inline-block mx-1"
                                style={{
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                                    transition: `all 0.5s ease-out ${1.3 + index * 0.08}s`,
                                    textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                                    fontWeight: word === 'CFS9' ? 'bold' : 'normal',
                                    color: word === 'CFS9' ? '#FF0000' : '#FFFFFF'
                                }}
                            >
                                {word}
                            </span>
                        ))}
                    </p>
                    <p className="text-lg text-white max-w-3xl mx-auto opacity-90">
                        Your ultimate fitness destination where transformation meets innovation
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    <StatCounter end={500} label="Active Members" delay={0.6} />
                    <StatCounter end={15} label="Expert Trainers" delay={0.7} />
                    <StatCounter end={1000} label="Success Stories" delay={0.8} />
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    <Feature 
                        icon="🏋️" 
                        title="State-of-the-Art Equipment" 
                        description="Train with the latest fitness technology and premium equipment designed for maximum performance and safety."
                        delay={1.2}
                    />
                    <Feature 
                        icon="👨‍🏫" 
                        title="Expert Trainers" 
                        description="Work with certified professionals who bring years of experience and personalized attention to your fitness journey."
                        delay={1.3}
                    />
                    <Feature 
                        icon="⏱️" 
                        title="24/7 Access" 
                        description="Workout on your schedule with round-the-clock access to our premium facilities, anytime day or night."
                        delay={1.4}
                    />
                    <Feature 
                        icon="🎯" 
                        title="Personalized Programs" 
                        description="Custom-tailored workout plans designed specifically for your goals, fitness level, and lifestyle."
                        delay={1.5}
                    />
                </div>
            </div>
        </section>
    );
};

export default About;
