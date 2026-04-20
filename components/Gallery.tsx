import React, { useEffect, useRef, useState } from 'react';

const GALLERY_IMAGES = Array.from({ length: 12 }, (_, i) => ({
    src: `/gallery/${i + 1}.jpg`,
    alt: `CFS9 Gym moment ${i + 1}`
}));

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

    return (
        <section id="gallery" ref={sectionRef} className={`section ${isVisible ? 'is-visible' : ''}`}>
            <div className="site-container">
                <div className="section__header reveal">
                    <p className="eyebrow">Gallery</p>
                    <h2 className="headline">Spaces that inspire</h2>
                    <p className="subhead">
                        A glimpse into the training floor, the energy, and the community behind CFS9.
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
                            <img src={image.src} alt={image.alt} loading="lazy" />
                        </button>
                    ))}
                </div>
            </div>

            {selectedImage !== null && (
                <div className="lightbox" onClick={() => setSelectedImage(null)}>
                    <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
                        <div className="lightbox__header">
                            <strong>{GALLERY_IMAGES[selectedImage].alt}</strong>
                            <button className="lightbox__close" onClick={() => setSelectedImage(null)} aria-label="Close image">
                                x
                            </button>
                        </div>
                        <img src={GALLERY_IMAGES[selectedImage].src} alt={GALLERY_IMAGES[selectedImage].alt} />
                    </div>
                </div>
            )}
        </section>
    );
};

export default Gallery;
