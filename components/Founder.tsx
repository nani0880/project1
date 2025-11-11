import React, { useState, useEffect, useRef } from 'react';

const Founder: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, [isVisible]);

    return (
        <section 
            id="founder" 
            ref={sectionRef} 
            className="relative min-h-screen py-20 md:py-32 overflow-hidden"
            style={{ backgroundColor: '#0A0A0A' }}
        >
            {/* Background with gradient */}
            <div 
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(circle at top right, rgba(255, 0, 0, 0.1), transparent 50%)',
                }}
            ></div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 
                        className="text-6xl md:text-8xl font-black tracking-tight mb-4"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        {'MEET THE '.split('').map((letter, index) => (
                            <span
                                key={`meet-${index}`}
                                className="inline-block"
                                style={{
                                    color: '#FFFFFF',
                                    textShadow: '0 4px 20px rgba(0,0,0,0.9)',
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0) rotateX(0deg)' : 'translateY(30px) rotateX(-90deg)',
                                    transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.05}s`,
                                }}
                            >
                                {letter === ' ' ? '\u00A0' : letter}
                            </span>
                        ))}
                        {'VISIONARY'.split('').map((letter, index) => (
                            <span
                                key={`visionary-${index}`}
                                className="inline-block"
                                style={{
                                    color: '#FF0000',
                                    textShadow: '0 0 40px rgba(255, 0, 0, 0.8), 0 4px 20px rgba(0,0,0,0.9)',
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0) rotateX(0deg)' : 'translateY(30px) rotateX(-90deg)',
                                    transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.5 + index * 0.05}s`,
                                }}
                            >
                                {letter}
                            </span>
                        ))}
                    </h2>
                    <p 
                        className="text-2xl text-white max-w-3xl mx-auto" 
                        style={{ 
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 300,
                            letterSpacing: '0.05em',
                            textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 1s',
                        }}
                    >
                        The Fitness Coach Behind CFS9 Gym
                    </p>
                </div>

                {/* Main Content - Two Column Layout */}
                <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
                    {/* Left Column - Text Content */}
                    <div className="space-y-6">
                        {/* Founder Name */}
                        <div className="mb-8">
                            <h3 
                                className="text-5xl md:text-6xl font-black text-red-500 mb-2" 
                                style={{ 
                                    fontFamily: "'Playfair Display', serif",
                                    textShadow: '0 0 30px rgba(255, 0, 0, 0.8)',
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateX(0) scale(1)' : 'translateX(-50px) scale(0.9)',
                                    transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s',
                                }}
                            >
                                Satish Bachala
                            </h3>
                            <p 
                                className="text-xl text-white opacity-90"
                                style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontWeight: 300,
                                    letterSpacing: '0.1em',
                                    opacity: isVisible ? 0.9 : 0,
                                    transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
                                    transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.5s',
                                }}
                            >
                                Founder & Visionary
                            </p>
                        </div>

                        {/* Story Content */}
                        <div className="space-y-6 text-white text-lg leading-relaxed">
                            <p 
                                style={{ 
                                    fontFamily: "'Inter', sans-serif",
                                    fontWeight: 400,
                                    lineHeight: '1.8',
                                    textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                                    transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.7s',
                                }}
                            >
                                <strong className="text-red-500" style={{ fontWeight: 600 }}>Satish Bachala</strong> founded CFS9 Gym in 2008, starting his inspiring fitness journey in Hyderabad. He transformed his passion into a mission to help people live healthier, more disciplined lives.
                            </p>

                            <p 
                                style={{ 
                                    fontFamily: "'Inter', sans-serif",
                                    fontWeight: 400,
                                    lineHeight: '1.8',
                                    textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                                    transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.9s',
                                }}
                            >
                                With over a decade of hands-on experience, Satish brings unmatched expertise to the fitness industry. He built CFS9 into one of Hyderabad's most luxurious and trusted fitness chains. His journey reflects grit, consistency, and a strong belief in human transformation.
                            </p>

                            <div className="glass p-6 rounded-lg my-8">
                                <p className="text-xl font-semibold text-red-500 mb-3">Milestone Moment</p>
                                <p style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                                    In a milestone moment, Satish invited legendary bodybuilder <strong>Ronnie Coleman</strong> to visit CFS9 Jubilee Hills. Ronnie toured the gym and worked out with members, proving CFS9's world-class reputation. This event strengthened Satish's global credibility and highlighted CFS9's elite status.
                                </p>
                            </div>

                            <p style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                                Satish began as a personal trainer, coaching clients to lose weight, build muscle, and improve health. His client-first approach delivered real results and quickly earned him local recognition.
                            </p>

                            <p style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                                He realized fitness goes beyond the body – it also shapes mindset and discipline. This insight led him to create the CFS concept.
                            </p>
                        </div>
                    </div>

                    {/* Right Column - Images */}
                    <div 
                        className="space-y-6"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateX(0)' : 'translateX(40px)',
                            transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.4s',
                        }}
                    >
                        {/* Main Founder Image */}
                        <div 
                            className="relative rounded-2xl overflow-hidden"
                            style={{
                                boxShadow: '0 20px 60px rgba(255, 0, 0, 0.3)',
                            }}
                        >
                            <img 
                                src="/founder/13.jpg" 
                                alt="Satish Bachala - Founder of CFS9 Gym"
                                className="w-full h-auto object-cover"
                                style={{
                                    minHeight: '400px',
                                    filter: 'brightness(0.9)',
                                }}
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'radial-gradient(circle at center, rgba(255, 0, 0, 0.1), transparent)',
                                    mixBlendMode: 'overlay',
                                }}
                            />
                        </div>

                        {/* Secondary Image */}
                        <div 
                            className="relative rounded-2xl overflow-hidden"
                            style={{
                                boxShadow: '0 20px 60px rgba(255, 0, 0, 0.2)',
                            }}
                        >
                            <img 
                                src="/founder/6.jpg" 
                                alt="Satish Bachala with Ronnie Coleman"
                                className="w-full h-auto object-cover"
                                style={{
                                    minHeight: '300px',
                                    filter: 'brightness(0.9)',
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Building a Luxury Brand Section */}
                <div 
                    className="mb-16"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                        transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.6s',
                    }}
                >
                    <h3 
                        className="text-4xl md:text-5xl font-black text-red-500 mb-6" 
                        style={{ 
                            fontFamily: "'Playfair Display', serif",
                            textShadow: '0 0 30px rgba(255, 0, 0, 0.8)',
                            letterSpacing: '-0.02em',
                        }}
                    >
                        Building a Luxury Fitness Brand with Purpose
                    </h3>
                    <div className="text-white text-lg leading-relaxed space-y-4">
                        <p 
                            style={{ 
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 400,
                                lineHeight: '1.8',
                                textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                            }}
                        >
                            Satish launched the CFS9 brand with elite branches in <strong style={{ fontWeight: 600 }}>Jubilee Hills, Madhapur, and Kondapur</strong>. Each branch reflects luxury, scientific training, professional standards, and a client-focused culture. He designed CFS9 gyms as wellness ecosystems, not just workout spaces.
                        </p>
                        <p 
                            style={{ 
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 400,
                                lineHeight: '1.8',
                                textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                            }}
                        >
                            Satish believes fitness should become a lifestyle, not a short-term solution. He helps people unlock potential through structured workouts and personalized nutrition plans. CFS9 attracts professionals, celebrities, and athletes seeking transformation and expert guidance.
                        </p>
                        <p 
                            style={{ 
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 400,
                                lineHeight: '1.8',
                                textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                            }}
                        >
                            As a fitness entrepreneur, Satish continues to raise standards in India's wellness industry. He leads new ventures and builds partnerships that reinforce CFS9's authority and trust. Satish also mentors fitness coaches, helping them grow and maintain high industry standards.
                        </p>
                    </div>
                </div>

                {/* Milestones Grid */}
                <div 
                    className="grid md:grid-cols-3 gap-6"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                        transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.8s',
                    }}
                >
                    <div className="glass p-6 rounded-lg text-center">
                        <div className="text-5xl font-black text-red-500 mb-2" style={{ textShadow: '0 0 30px rgba(255, 0, 0, 0.8)' }}>
                            2008
                        </div>
                        <p className="text-white">Founded CFS9 Gym</p>
                    </div>
                    <div className="glass p-6 rounded-lg text-center">
                        <div className="text-5xl font-black text-red-500 mb-2" style={{ textShadow: '0 0 30px rgba(255, 0, 0, 0.8)' }}>
                            2023
                        </div>
                        <p className="text-white">Hosted Ronnie Coleman</p>
                    </div>
                    <div className="glass p-6 rounded-lg text-center">
                        <div className="text-5xl font-black text-red-500 mb-2" style={{ textShadow: '0 0 30px rgba(255, 0, 0, 0.8)' }}>
                            2023
                        </div>
                        <p className="text-white">S9 Classic Expo</p>
                    </div>
                </div>

                {/* Mission Statement */}
                <div 
                    className="mt-16 text-center"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                        transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 1s',
                    }}
                >
                    <div className="glass p-8 md:p-12 rounded-2xl max-w-4xl mx-auto">
                        <p 
                            className="text-2xl md:text-3xl font-bold text-white mb-4"
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                fontStyle: 'italic',
                                lineHeight: '1.6',
                                letterSpacing: '-0.01em',
                            }}
                        >
                            "Create life-changing fitness experiences in a premium, science-backed environment."
                        </p>
                        <p 
                            className="text-xl text-red-500"
                            style={{
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 500,
                                letterSpacing: '0.05em',
                            }}
                        >
                            — Satish Bachala
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Founder;
