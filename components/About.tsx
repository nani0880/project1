import React, { useEffect, useRef, useState } from 'react';

const StatCounter: React.FC<{ end: number; label: string; start: boolean }> = ({ end, label, start }) => {
    const [count, setCount] = useState(0);
    const rafRef = useRef<number>();

    useEffect(() => {
        if (!start) return;
        
        const startTime = performance.now();
        const duration = 1600;

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            setCount(Math.floor(end * progress));
            
            if (progress < 1) {
                rafRef.current = requestAnimationFrame(animate);
            }
        };

        rafRef.current = requestAnimationFrame(animate);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [start, end]);

    return (
        <div className="stat-tile reveal">
            <div className="stat-value">{count}+</div>
            <div className="stat-label">{label}</div>
        </div>
    );
};

const Feature: React.FC<{ index: number; title: string; description: string }> = ({ index, title, description }) => (
    <div className="feature-card reveal">
        <div className="feature-icon">{String(index + 1).padStart(2, '0')}</div>
        <div>
            <h4>{title}</h4>
            <p className="subhead">{description}</p>
        </div>
    </div>
);

const About: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observerRef = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observerRef.disconnect();
                }
            },
            { threshold: 0.05, rootMargin: '100px' }
        );

        if (sectionRef.current) observerRef.observe(sectionRef.current);
        return () => observerRef.disconnect();
    }, []);

    const features = [
        {
            title: 'Equipment built for performance',
            description: 'Premium strength, cardio, and recovery gear calibrated for real progress.'
        },
        {
            title: 'Coaching that adapts',
            description: 'Certified trainers that plan, track, and adjust to your goals.'
        },
        {
            title: 'Always-on access',
            description: 'Train when your schedule demands it. Doors open day and night.'
        },
        {
            title: 'Programs with intent',
            description: 'Strength, conditioning, mobility, and body recomposition in one system.'
        }
    ];

    return (
        <section id="about" ref={sectionRef} className={`section ${isVisible ? 'is-visible' : ''}`}>
            <div className="site-container about__grid">
                <div>
                    <p className="eyebrow">About CFS</p>
                    <h2 className="headline">A training culture built on discipline</h2>
                    <p className="subhead">
                        CFS is a premium fitness destination in Jubilee Hills, Hyderabad. 
                        We combine elite coaching, modern equipment, and a focused
                        community to deliver transformation.
                    </p>

                    <div className="about__stats">
                        <StatCounter end={500} label="Members" start={isVisible} />
                        <StatCounter end={15} label="Coaches" start={isVisible} />
                        <StatCounter end={1000} label="Success stories" start={isVisible} />
                    </div>
                </div>

                <div className="about__media">
                    <div className="about__image">
                        <img src="/our facility/A6706305.JPG.jpeg" alt="Training floor at CFS" loading="lazy" decoding="async" />
                    </div>
                    <div className="card about__floating">
                        <h4>Best gym in Jubilee Hills</h4>
                        <p className="subhead">
                            Strength, personal training, and group classes under one roof.
                        </p>
                    </div>
                </div>
            </div>

            <div className="site-container">
                <div className="feature-grid">
                    {features.map((feature, index) => (
                        <Feature
                            key={feature.title}
                            index={index}
                            title={feature.title}
                            description={feature.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
export default About;
    