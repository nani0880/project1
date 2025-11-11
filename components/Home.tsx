import React, { useEffect, useRef, useState } from 'react';

export const Logo: React.FC<{className?: string}> = ({ className }) => (
    <div className={`${className} text-4xl font-black tracking-tighter`}>
        <span className="text-white">CFS</span>
        <span style={{ color: '#FF0000' }}>9</span>
    </div>
);

const Home: React.FC = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [videoLoaded, setVideoLoaded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const wordsRef = useRef<HTMLSpanElement[]>([]);
    const rafRef = useRef<number>();

    useEffect(() => {
        let targetX = 0;
        let targetY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            targetX = (e.clientX / window.innerWidth - 0.5) * 10; // Reduced from 20 to 10
            targetY = (e.clientY / window.innerHeight - 0.5) * 10;
            
            // Use requestAnimationFrame for smooth updates
            if (!rafRef.current) {
                rafRef.current = requestAnimationFrame(() => {
                    setMousePos({ x: targetX, y: targetY });
                    rafRef.current = undefined;
                });
            }
        };

        // Ensure video plays
        if (videoRef.current) {
            videoRef.current.play().catch(() => {
                console.log('Video autoplay failed');
            });
        }

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, []);

    const words = ['Train.', 'Transform.', 'Triumph.'];

    return (
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Video - Multiple sources for compatibility */}
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover will-change-transform"
                style={{
                    transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
                    opacity: videoLoaded ? 1 : 0,
                    transition: 'opacity 1s ease-in-out'
                }}
                onLoadedData={() => setVideoLoaded(true)}
                onError={() => {
                    console.log('Video failed to load, using fallback');
                    setVideoLoaded(false);
                }}
            >
                {/* Your local video - optimized for fast loading */}
                <source src="/home-video.mp4" type="video/mp4" />
            </video>
            
            {/* Alternative: Animated GIF Background (if video doesn't load) */}
            {!videoLoaded && (
                <img
                    src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3I3cjF1ZWNsN2w3anNnMWoya3VtM25paml3MHd1bGF2MnAxbGh2eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TdWS6I6bWTxFoRsh00/giphy.gif"
                    alt="Athlete working out with battle ropes"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            )}
            
            {/* Static Fallback Background Image (shows while loading) */}
            <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070)',
                    opacity: videoLoaded ? 0 : 0.5,
                    zIndex: -1,
                    transition: 'opacity 1s ease-in-out'
                }}
            ></div>

            {/* Dark Gradient Overlay - Cinematic depth */}
            <div 
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.7) 100%)',
                    animation: 'fadeIn 1s ease-out'
                }}
            ></div>

            {/* Content - No background, no border, completely transparent */}
            <div className="relative z-10 text-center px-6 max-w-5xl">
                    {/* Animated Headline - Premium Style */}
                    <h2 
                        className="text-2xl md:text-4xl uppercase mb-6"
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 300,
                            letterSpacing: '0.2em',
                            color: '#FFFFFF',
                            textShadow: '0 4px 12px rgba(0,0,0,0.8)',
                            opacity: 0,
                            transform: 'translateY(60px)',
                            animation: 'cultFadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
                            animationDelay: '0.1s'
                        }}
                    >
                        WELCOME TO CFS9
                    </h2>

                    {/* Main Headline - Premium Playfair Display */}
                    <h1 
                        className="text-5xl md:text-8xl mb-8"
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            fontWeight: 900,
                            letterSpacing: '-0.02em',
                            lineHeight: 1.1,
                        }}
                    >
                        {words.map((word, index) => (
                            <span
                                key={index}
                                ref={el => { if (el) wordsRef.current[index] = el; }}
                                className="inline-block mx-2"
                                style={{
                                    color: index === 1 ? '#FF0000' : '#FFFFFF',
                                    opacity: 0,
                                    transform: 'translateY(60px)',
                                    animation: 'cultFadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
                                    animationDelay: `${0.3 + index * 0.2}s`,
                                    textShadow: index === 1 
                                        ? '0 0 40px rgba(255, 0, 0, 0.8), 0 4px 20px rgba(0,0,0,0.9)' 
                                        : '0 4px 20px rgba(0,0,0,0.9)'
                                }}
                            >
                                {word}
                            </span>
                        ))}
                    </h1>

                    {/* Subheading - Premium Inter */}
                    <p 
                        className="text-lg md:text-2xl text-white mb-10 max-w-3xl mx-auto"
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 300,
                            lineHeight: 1.8,
                            letterSpacing: '0.02em',
                            opacity: 0,
                            transform: 'translateY(60px)',
                            animation: 'cultFadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
                            animationDelay: '0.9s',
                            textShadow: '0 2px 10px rgba(0,0,0,0.9)'
                        }}
                    >
                        Unleash your potential in a premium, high-energy environment. Join the CFS9 community and experience transformation.
                    </p>

                    {/* CTA Buttons - Cult.fit Style with Scale Animation */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="#contact"
                            className="px-10 py-4 rounded-full text-lg font-bold relative z-10 transition-all duration-300"
                            style={{
                                backgroundColor: '#FF0000',
                                color: '#FFFFFF',
                                boxShadow: '0 0 20px rgba(255, 0, 0, 0.5)',
                                opacity: 0,
                                transform: 'scale(0.9) translateY(30px)',
                                animation: 'cultScaleIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                                animationDelay: '1.2s'
                            }}
                            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                e.currentTarget.style.boxShadow = '0 0 40px rgba(255, 0, 0, 0.8)';
                                e.currentTarget.style.transform = 'scale(1.05) translateY(-4px)';
                            }}
                            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 0, 0, 0.5)';
                                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                            }}
                        >
                            Get Started
                        </a>
                        <a
                            href="#programs"
                            className="px-10 py-4 rounded-full text-lg font-bold text-white transition-all duration-300"
                            style={{
                                border: '2px solid #FFFFFF',
                                background: 'rgba(255, 255, 255, 0.15)',
                                backdropFilter: 'blur(10px)',
                                boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
                                opacity: 0,
                                transform: 'scale(0.9) translateY(30px)',
                                animation: 'cultScaleIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                                animationDelay: '1.4s'
                            }}
                            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                                e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.5)';
                                e.currentTarget.style.transform = 'scale(1.05) translateY(-4px)';
                            }}
                            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                                e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.3)';
                                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                            }}
                        >
                            Explore Programs
                        </a>
                    </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fadeInUp"
                style={{
                    animationDelay: '1.5s',
                    opacity: 0,
                    animationFillMode: 'forwards'
                }}>
                <div className="w-6 h-10 border-2 rounded-full flex justify-center"
                    style={{ borderColor: '#00E676' }}>
                    <div className="w-1 h-3 rounded-full mt-2 animate-bounce"
                        style={{ backgroundColor: '#00E676' }}></div>
                </div>
            </div>
        </section>
    );
};

export default Home;
