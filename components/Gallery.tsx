import React, { useState, useEffect, useRef } from 'react';

// Generate array of 14 gallery images
const GALLERY_IMAGES = Array.from({ length: 14 }, (_, i) => ({
    src: `/gallery/${i + 1}.jpg`,
    alt: `CFS9 Gym - Image ${i + 1}`
}));

const Gallery: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

    // Auto-rotate images every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % GALLERY_IMAGES.length);
        }, 5000); // 5 seconds

        return () => clearInterval(interval);
    }, []);

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
            id="gallery" 
            ref={sectionRef} 
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: '#0A0A0A', minHeight: '150vh' }}
        >
            {/* Background Images - Auto-Rotating Slideshow - Reduced Size */}
            <div className="absolute inset-0 z-0 flex items-center justify-center">
                {/* Main rotating image - Only render current, previous, and next images */}
                {GALLERY_IMAGES.map((image, index) => {
                    // Only render images that are current, previous, or next (for smooth transitions)
                    const prevIndex = (currentImageIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
                    const nextIndex = (currentImageIndex + 1) % GALLERY_IMAGES.length;
                    const shouldRender = index === currentImageIndex || index === prevIndex || index === nextIndex;
                    
                    if (!shouldRender) return null;
                    
                    return (
                        <div
                            key={index}
                            className="absolute"
                            style={{
                                width: '80%',
                                height: '70%',
                                maxWidth: '1200px',
                                opacity: currentImageIndex === index ? 1 : 0,
                                zIndex: currentImageIndex === index ? 1 : 0,
                                transition: 'opacity 1s ease-in-out',
                                willChange: currentImageIndex === index ? 'opacity' : 'auto',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                boxShadow: '0 20px 60px rgba(255, 0, 0, 0.3)',
                            }}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                loading={index === 0 ? 'eager' : 'lazy'}
                                decoding="async"
                                className="w-full h-full object-cover"
                                style={{
                                    filter: 'brightness(0.6)',
                                    transform: 'translateZ(0)',
                                    backfaceVisibility: 'hidden',
                                    objectPosition: 'center',
                                }}
                            />
                            {/* Red glow overlay */}
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'radial-gradient(circle at center, rgba(255, 0, 0, 0.15), transparent)',
                                    mixBlendMode: 'overlay',
                                }}
                            />
                        </div>
                    );
                })}

                {/* Thumbnail indicators at bottom */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
                    {GALLERY_IMAGES.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className="transition-all duration-300"
                            style={{
                                width: currentImageIndex === index ? '40px' : '12px',
                                height: '12px',
                                borderRadius: '6px',
                                backgroundColor: currentImageIndex === index ? '#FF0000' : 'rgba(255, 255, 255, 0.5)',
                                border: 'none',
                                cursor: 'pointer',
                                boxShadow: currentImageIndex === index ? '0 0 10px rgba(255, 0, 0, 0.8)' : 'none',
                            }}
                            aria-label={`Go to image ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Foreground Text - Floating and Centered */}
            <div 
                className="relative z-10 text-center px-6 max-w-5xl"
                style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                    transition: 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
            >
                {/* Main Headline - Premium Playfair with Letter Animation */}
                <h2 
                    className="text-5xl md:text-8xl mb-8"
                    style={{ 
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 900,
                        letterSpacing: '-0.02em',
                        lineHeight: 1.1,
                    }}
                >
                    {'Transformations That '.split('').map((letter, index) => (
                        <span
                            key={`trans-${index}`}
                            className="inline-block"
                            style={{
                                color: '#FFFFFF',
                                textShadow: '0 4px 20px rgba(0, 0, 0, 0.9), 0 0 40px rgba(255, 255, 255, 0.3)',
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0) rotateX(0deg)' : 'translateY(30px) rotateX(-90deg)',
                                transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.03}s`,
                            }}
                        >
                            {letter === ' ' ? '\u00A0' : letter}
                        </span>
                    ))}
                    {'Inspire'.split('').map((letter, index) => (
                        <span
                            key={`inspire-${index}`}
                            className="inline-block"
                            style={{
                                color: '#FF0000',
                                textShadow: '0 0 40px rgba(255, 0, 0, 0.8), 0 4px 20px rgba(0, 0, 0, 0.9)',
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0) rotateX(0deg)' : 'translateY(30px) rotateX(-90deg)',
                                transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.6 + index * 0.05}s`,
                            }}
                        >
                            {letter}
                        </span>
                    ))}
                </h2>
                
                {/* Subheading - Premium Inter with Word Animation */}
                <p 
                    className="text-xl md:text-3xl text-white max-w-3xl mx-auto"
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 300,
                        lineHeight: 1.8,
                        letterSpacing: '0.02em',
                        textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)',
                    }}
                >
                    {'Real people. Real results. Real transformation.'.split(' ').map((word, index) => (
                        <span
                            key={index}
                            className="inline-block mx-1"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                                transition: `all 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${1 + index * 0.1}s`,
                            }}
                        >
                            {word}
                        </span>
                    ))}
                </p>


            </div>

            {/* Subtle overlay for text contrast */}
            <div 
                className="absolute inset-0 z-0"
                style={{
                    background: 'radial-gradient(circle at center, rgba(0,0,0,0.2), rgba(0,0,0,0.5))',
                    pointerEvents: 'none',
                }}
            />

            {/* Lightbox Modal */}
            {selectedImage !== null && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeInUp"
                    style={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.95)',
                        backdropFilter: 'blur(10px)'
                    }}
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="glass p-4 max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-white">
                                {GALLERY_IMAGES[selectedImage].alt}
                            </h3>
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="text-white text-3xl hover:text-red-500 transition-colors"
                            >
                                ×
                            </button>
                        </div>
                        <img
                            src={GALLERY_IMAGES[selectedImage].src}
                            alt={GALLERY_IMAGES[selectedImage].alt}
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

export default Gallery;
