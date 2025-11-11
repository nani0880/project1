import React, { useState, useEffect, useRef } from 'react';
import { PROGRAMS_DATA } from '../constants';
import type { Program } from '../types';

// Define video URLs for each program
const PROGRAM_VIDEOS = [
    '/program1-video.mp4', // Strength Training video
    '/program2-video.mp4', // Cardio video
    '/program2-video.mp4', // Yoga video (using program2 as fallback until you add program3)
];

// Fallback online videos
const FALLBACK_VIDEOS = [
    'https://cdn.pixabay.com/video/2023/05/02/160827-822011893_large.mp4',
    'https://videos.pexels.com/video-files/3766203/3766203-uhd_2560_1440_25fps.mp4',
    'https://videos.pexels.com/video-files/2795750/2795750-uhd_2560_1440_25fps.mp4',
];

const ProgramCard: React.FC<{ 
    program: Program; 
    index: number; 
    onHover: () => void;
    isActive: boolean;
}> = ({ program, index, onHover, isActive }) => {
    return (
        <div 
            className="relative h-96 animate-fadeInUp cursor-pointer transition-all duration-300"
            style={{
                animationDelay: `${0.4 + index * 0.15}s`,
                opacity: 0,
                animationFillMode: 'forwards',
                transform: isActive ? 'scale(1.05)' : 'scale(1)'
            }}
            onMouseEnter={onHover}
        >
            <div className="h-full p-8 flex flex-col items-center justify-center text-center">
                <div className="text-6xl mb-6 transition-transform duration-300"
                    style={{ 
                        transform: isActive ? 'scale(1.2)' : 'scale(1)',
                        filter: isActive ? 'drop-shadow(0 0 20px #FF0000)' : 'none'
                    }}>
                    {program.icon}
                </div>
                <h3 className="text-3xl font-bold mb-4 transition-all duration-300"
                    style={{ 
                        color: isActive ? '#FF0000' : '#FFFFFF',
                        textShadow: isActive 
                            ? '0 0 30px rgba(255, 0, 0, 0.8), 0 4px 12px rgba(0,0,0,1)' 
                            : '0 4px 8px rgba(0,0,0,1)'
                    }}>
                    {program.title}
                </h3>
                <p className="text-white leading-relaxed mb-6"
                    style={{ 
                        textShadow: '0 4px 8px rgba(0,0,0,1)',
                        opacity: isActive ? 1 : 0.9
                    }}>
                    {program.description}
                </p>
                <a
                    href="#contact"
                    className="px-6 py-3 rounded-full font-semibold transition-all duration-300"
                    style={{
                        backgroundColor: isActive ? '#FF0000' : 'rgba(255, 255, 255, 0.2)',
                        color: '#FFFFFF',
                        boxShadow: isActive ? '0 0 20px rgba(255, 0, 0, 0.5)' : 'none',
                        textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                    }}
                >
                    Learn More
                </a>
            </div>
        </div>
    );
};

const Programs: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeVideo, setActiveVideo] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Play the first video when section is visible
                    if (videoRefs.current[0]) {
                        videoRefs.current[0].play().catch(() => {
                            console.log('Video autoplay failed');
                        });
                    }
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const handleCardHover = (index: number) => {
        setActiveVideo(index);
        // Play the hovered video
        if (videoRefs.current[index]) {
            videoRefs.current[index]?.play().catch(() => {
                console.log('Video play failed');
            });
        }
    };

    return (
        <section 
            id="programs" 
            ref={sectionRef} 
            className="relative min-h-screen py-20 md:py-32 overflow-hidden"
            style={{ backgroundColor: '#0A0A0A' }}
        >
            {/* Background Videos - One for each program - High visibility */}
            {PROGRAM_VIDEOS.map((videoSrc, index) => (
                <video
                    key={index}
                    ref={el => videoRefs.current[index] = el}
                    autoPlay={index === 0}
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                    style={{
                        opacity: activeVideo === index ? 1 : 0,
                        filter: 'brightness(0.7)'
                    }}
                >
                    <source src={videoSrc} type="video/mp4" />
                    <source src={FALLBACK_VIDEOS[index]} type="video/mp4" />
                </video>
            ))}

            {/* Light Overlay for text readability */}
            <div className="absolute inset-0 bg-black/20"></div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 
                        className="text-6xl md:text-8xl font-black tracking-tight mb-4 animate-fadeInDown"
                        style={{ 
                            color: '#FFFFFF',
                            textShadow: '0 4px 12px rgba(0,0,0,1)',
                            opacity: isVisible ? 1 : 0,
                            animationDelay: '0.2s',
                            animationFillMode: 'forwards'
                        }}
                    >
                        OUR <span style={{ color: '#FF0000', textShadow: '0 0 30px rgba(255, 0, 0, 0.8), 0 4px 12px rgba(0,0,0,1)' }}>PROGRAMS</span>
                    </h2>
                    <p 
                        className="text-xl text-white max-w-3xl mx-auto animate-fadeInUp"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            animationDelay: '0.3s',
                            animationFillMode: 'forwards',
                            textShadow: '0 4px 8px rgba(0,0,0,1)'
                        }}
                    >
                        Discover specialized training programs designed to transform your body and mind
                    </p>
                </div>

                {/* Programs Grid */}
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {PROGRAMS_DATA.map((program, index) => (
                        <ProgramCard 
                            key={index} 
                            program={program} 
                            index={index}
                            onHover={() => handleCardHover(index)}
                            isActive={activeVideo === index}
                        />
                    ))}
                </div>

                {/* Additional Info */}
                <div 
                    className="p-8 mt-16 text-center max-w-4xl mx-auto animate-scaleIn"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        animationDelay: '1s',
                        animationFillMode: 'forwards'
                    }}
                >
                    <p className="text-lg text-white" style={{ textShadow: '0 4px 8px rgba(0,0,0,1)' }}>
                        All programs include personalized coaching, progress tracking, and nutritional guidance. 
                        <span className="font-bold" style={{ color: '#FF0000', textShadow: '0 0 20px rgba(255, 0, 0, 0.8), 0 4px 8px rgba(0,0,0,1)' }}> Hover over each card</span> to see it in action.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Programs;
