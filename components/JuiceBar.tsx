import React, { useEffect, useRef, useState } from 'react';

interface Juice {
    name: string;
    description: string;
    benefits: string;
    image: string;
}

const JUICE_MENU: Juice[] = [
    {
        name: 'Protein Power',
        description: 'Banana, peanut butter, whey protein, almond milk',
        benefits: 'Muscle recovery & growth',
        image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=300&fit=crop'
    },
    {
        name: 'Green Energy',
        description: 'Spinach, apple, cucumber, ginger, lemon',
        benefits: 'Detox & energy boost',
        image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&h=300&fit=crop'
    },
    {
        name: 'Berry Blast',
        description: 'Mixed berries, yogurt, honey, chia seeds',
        benefits: 'Antioxidants & immunity',
        image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop'
    },
    {
        name: 'Tropical Refresh',
        description: 'Mango, pineapple, coconut water, mint',
        benefits: 'Hydration & vitamins',
        image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=300&fit=crop'
    },
    {
        name: 'Post-Workout',
        description: 'Banana, dates, oats, protein, cinnamon',
        benefits: 'Quick recovery',
        image: 'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=400&h=300&fit=crop'
    },
    {
        name: 'Immunity Booster',
        description: 'Orange, carrot, turmeric, ginger',
        benefits: 'Immune support',
        image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop'
    }
];

const JuiceCard: React.FC<{ juice: Juice; index: number }> = ({ juice, index }) => (
    <div className="juice-card reveal" style={{ transitionDelay: `${0.1 * index}s` }}>
        <div className="juice-card__image">
            <img src={juice.image} alt={juice.name} loading="lazy" decoding="async" />
            <div className="juice-card__badge">{juice.benefits}</div>
        </div>
        <div className="juice-card__content">
            <h3>{juice.name}</h3>
            <p className="juice-card__description">{juice.description}</p>
        </div>
    </div>
);

const JuiceBar: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: '100px' }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="juice-bar" ref={sectionRef} className={`section ${isVisible ? 'is-visible' : ''}`}>
            <div className="site-container">
                <div className="section__header reveal">
                    <p className="eyebrow">Juice Bar</p>
                    <h2 className="headline">Fuel your fitness</h2>
                    <p className="subhead">
                        Fresh, healthy juices and smoothies crafted to complement your workout. 
                        Packed with nutrients to energize, recover, and perform at your best.
                    </p>
                </div>

                <div className="juice-grid">
                    {JUICE_MENU.map((juice, index) => (
                        <JuiceCard
                            key={juice.name}
                            juice={juice}
                            index={index}
                        />
                    ))}
                </div>

                <div className="juice-bar__cta reveal">
                    <div className="card card--glass">
                        <h3 className="headline" style={{ fontSize: '1.8rem', marginBottom: '12px' }}>Visit our juice bar</h3>
                        <p className="subhead">
                            Available at the gym counter. Custom blends and special requests welcome.
                        </p>
                        <a href="#contact" className="btn btn-primary" style={{ marginTop: '16px' }}>
                            Ask about our menu
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JuiceBar;
