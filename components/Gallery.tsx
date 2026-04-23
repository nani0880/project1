import React, { useEffect, useRef, useState } from 'react';

const GALLERY_IMAGES = [
    { src: '/our facility/A6706305.JPG.jpeg', alt: 'Premium training floor with state-of-the-art equipment' },
    { src: '/our facility/A6706308.JPG.jpeg', alt: 'Cardio zone with advanced machines' },
    { src: '/our facility/A6706309.JPG.jpeg', alt: 'Strength training area with free weights' },
    { src: '/our facility/A6706311.JPG.jpeg', alt: 'Personal training session space' },
    { src: '/our facility/A6706315.JPG.jpeg', alt: 'Group fitness and functional training area' },
    { src: '/our facility/A6706690.JPG.jpeg', alt: 'High-performance workout zone' },
    { src: '/our facility/A6706698.JPG.jpeg', alt: 'Modern reception and lounge area' },
    { src: '/our facility/IMG_20260316_200320.jpg.jpeg', alt: 'Premium locker room facilities' },
    { src: '/gym equipment/A6706672.JPG.jpeg', alt: 'Professional cardio equipment' },
    { src: '/gym equipment/A6706674.JPG.jpeg', alt: 'Complete dumbbell range' },
    { src: '/gym equipment/A6706681.JPG.jpeg', alt: 'Bench press and strength stations' },
    { src: '/gym equipment/A6706700.jpg.jpeg', alt: 'Power racks and squat stations' },
    { src: '/gym equipment/A6706712.jpg.jpeg', alt: 'Cable machines and functional trainers' },
    { src: '/gym equipment/IMG_20260423_085330.jpg.jpeg', alt: 'Full-body training equipment' }
];

const Gallery: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observerRef.current?.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: '50px' }
        );

        if (sectionRef.current) observerRef.current.observe(sectionRef.current);
        return () => observerRef.current?.disconnect();
    }, []);

    useEffect(() => {
        if (selectedImage === null) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setSelectedImage(null);
            } else if (e.key === 'ArrowLeft') {
                setSelectedImage(selectedImage === 0 ? GALLERY_IMAGES.length - 1 : selectedImage - 1);
            } else if (e.key === 'ArrowRight') {
                setSelectedImage(selectedImage === GALLERY_IMAGES.length - 1 ? 0 : selectedImage + 1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage]);

    return (
        <section id="gallery" ref={sectionRef} className={`section ${isVisible ? 'is-visible' : ''}`}>
            <div className="site-container">
                <div className="section__header reveal">
                    <p className="eyebrow">Our Facility</p>
                    <h2 className="headline">World-class training environment</h2>
                    <p className="subhead">
                        Experience premium facilities designed for peak performance. From cutting-edge equipment to spacious training zones, every detail crafted for your success.
                    </p>
                </div>

                <div className="gallery-grid">
                    {GALLERY_IMAGES.map((image, index) => (
                        <button
                            key={image.src}
                            className="gallery-card reveal"
                            style={{ transitionDelay: `${0.05 * index}s` }}
                            onClick={() => setSelectedImage(index)}
                            aria-label={`Open image ${index + 1}`}
                        >
                            <img 
                                src={image.src} 
                                alt={image.alt} 
                                loading="lazy" 
                                decoding="async"
                                width="400"
                                height="300"
                            />
                            <div className="gallery-zoom-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <circle cx="11" cy="11" r="8"/>
                                    <path d="m21 21-4.35-4.35"/>
                                    <line x1="11" y1="8" x2="11" y2="14"/>
                                    <line x1="8" y1="11" x2="14" y2="11"/>
                                </svg>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {selectedImage !== null && (
                <div className="lightbox" onClick={() => setSelectedImage(null)}>
                    <button 
                        className="lightbox__nav lightbox__nav--prev"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(selectedImage === 0 ? GALLERY_IMAGES.length - 1 : selectedImage - 1);
                        }}
                        aria-label="Previous image"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M15 18l-6-6 6-6"/>
                        </svg>
                    </button>
                    
                    <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
                        <div className="lightbox__header">
                            <strong>{GALLERY_IMAGES[selectedImage].alt}</strong>
                            <button className="lightbox__close" onClick={() => setSelectedImage(null)} aria-label="Close image">
                                ×
                            </button>
                        </div>
                        <img src={GALLERY_IMAGES[selectedImage].src} alt={GALLERY_IMAGES[selectedImage].alt} />
                        <div className="lightbox__counter">
                            {selectedImage + 1} / {GALLERY_IMAGES.length}
                        </div>
                    </div>
                    
                    <button 
                        className="lightbox__nav lightbox__nav--next"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(selectedImage === GALLERY_IMAGES.length - 1 ? 0 : selectedImage + 1);
                        }}
                        aria-label="Next image"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M9 18l6-6-6-6"/>
                        </svg>
                    </button>
                </div>
            )}
        </section>
    );
};

export default Gallery;
