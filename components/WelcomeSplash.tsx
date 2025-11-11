import React, { useState, useEffect } from 'react';

const WelcomeSplash: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isAnimating, setIsAnimating] = useState(true);

    useEffect(() => {
        // Start exit animation after 2 seconds (faster)
        const exitTimer = setTimeout(() => {
            setIsAnimating(false);
        }, 2000);

        // Remove component after animation completes
        const removeTimer = setTimeout(() => {
            setIsVisible(false);
        }, 2300);

        return () => {
            clearTimeout(exitTimer);
            clearTimeout(removeTimer);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500"
            style={{
                backgroundColor: '#0A0A0A',
                opacity: isAnimating ? 1 : 0,
                pointerEvents: isAnimating ? 'auto' : 'none'
            }}
        >
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Animated gradient circles */}
                <div 
                    className="absolute w-96 h-96 rounded-full animate-pulse"
                    style={{
                        background: 'radial-gradient(circle, rgba(255, 0, 0, 0.3) 0%, transparent 70%)',
                        top: '20%',
                        left: '10%',
                        animation: 'float 3s ease-in-out infinite'
                    }}
                ></div>
                <div 
                    className="absolute w-96 h-96 rounded-full animate-pulse"
                    style={{
                        background: 'radial-gradient(circle, rgba(255, 0, 0, 0.2) 0%, transparent 70%)',
                        bottom: '20%',
                        right: '10%',
                        animation: 'float 3s ease-in-out infinite',
                        animationDelay: '1s'
                    }}
                ></div>
            </div>

            {/* Logo and Text Container */}
            <div className="relative z-10 text-center">
                {/* CFS9 Logo Image */}
                <div className="mb-8">
                    <img 
                        src="/logo.png" 
                        alt="CFS9 Gym Logo" 
                        className="mx-auto animate-scaleIn"
                        style={{
                            width: '300px',
                            height: 'auto',
                            maxWidth: '80vw',
                            animationDuration: '0.8s',
                            animationDelay: '0.2s',
                            animationFillMode: 'forwards',
                            opacity: 0,
                            filter: 'drop-shadow(0 0 40px rgba(255, 0, 0, 0.6)) drop-shadow(0 4px 12px rgba(0,0,0,1))'
                        }}
                    />
                </div>

                {/* Animated Welcome Image */}
                <div 
                    className="mb-8 animate-scaleIn"
                    style={{
                        animationDuration: '0.8s',
                        animationDelay: '0.6s',
                        animationFillMode: 'forwards',
                        opacity: 0
                    }}
                >
                    <img 
                        src="/welcome-image.jpg" 
                        alt="CFS9 Welcome" 
                        className="mx-auto max-w-md w-full h-auto rounded-2xl"
                        style={{
                            boxShadow: '0 0 60px rgba(255, 0, 0, 0.5), 0 10px 40px rgba(0,0,0,0.8)',
                            animation: 'imageFloat 3s ease-in-out infinite'
                        }}
                    />
                </div>

                {/* Tagline */}
                <div 
                    className="text-3xl font-light tracking-widest uppercase animate-fadeInUp"
                    style={{
                        color: '#FFFFFF',
                        textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                        animationDelay: '0.8s',
                        opacity: 0,
                        animationFillMode: 'forwards'
                    }}
                >
                    Train. Transform. Triumph.
                </div>

                {/* Loading Bar */}
                <div 
                    className="mt-12 w-64 h-1 mx-auto bg-gray-800 rounded-full overflow-hidden animate-fadeInUp"
                    style={{
                        animationDelay: '1s',
                        opacity: 0,
                        animationFillMode: 'forwards'
                    }}
                >
                    <div 
                        className="h-full rounded-full"
                        style={{
                            background: 'linear-gradient(90deg, #FFFFFF, #FF0000)',
                            animation: 'loadingBar 3s ease-out forwards'
                        }}
                    ></div>
                </div>
            </div>

            {/* CSS Animations */}
            <style>{`
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0) scale(1);
                    }
                    50% {
                        transform: translateY(-20px) scale(1.1);
                    }
                }

                @keyframes imageFloat {
                    0%, 100% {
                        transform: translateY(0) scale(1);
                    }
                    50% {
                        transform: translateY(-10px) scale(1.02);
                    }
                }

                @keyframes loadingBar {
                    from {
                        width: 0%;
                    }
                    to {
                        width: 100%;
                    }
                }
            `}</style>
        </div>
    );
};

export default WelcomeSplash;
