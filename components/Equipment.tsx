import React, { useEffect, useRef, useState } from 'react';

interface Equipment {
    image: string;
    name: string;
    description: string;
}

const EQUIPMENT_DATA: Equipment[] = [
    {
        image: '/gym equipment/A6706672.JPG.jpeg',
        name: 'Treadmill',
        description: 'High-performance cardio machines with advanced tracking and customizable programs for endurance training.'
    },
    {
        image: '/gym equipment/A6706674.JPG.jpeg',
        name: 'Dumbbells',
        description: 'Complete range from 2.5kg to 50kg for strength training, muscle building, and functional fitness.'
    },
    {
        image: '/gym equipment/A6706681.JPG.jpeg',
        name: 'Bench Press',
        description: 'Professional-grade benches for chest, shoulder, and tricep development with safety features.'
    },
    {
        image: '/gym equipment/A6706700.jpg.jpeg',
        name: 'Squat Rack',
        description: 'Heavy-duty power racks with adjustable safety bars for squats, deadlifts, and compound movements.'
    },
    {
        image: '/gym equipment/A6706712.jpg.jpeg',
        name: 'Cable Machine',
        description: 'Multi-functional cable systems for targeted muscle isolation and full-body workouts.'
    },
    {
        image: '/gym equipment/IMG_20260423_085330.jpg.jpeg',
        name: 'Rowing Machine',
        description: 'Full-body cardio equipment for building endurance, strength, and burning calories efficiently.'
    }
];

const EquipmentCard: React.FC<{ equipment: Equipment; index: number }> = ({ equipment, index }) => (
    <div className="equipment-card reveal" style={{ transitionDelay: `${0.1 * index}s` }}>
        <div className="equipment-card__image">
            <img src={equipment.image} alt={equipment.name} loading="lazy" decoding="async" />
        </div>
        <div className="equipment-card__content">
            <h3>{equipment.name}</h3>
            <p>{equipment.description}</p>
        </div>
    </div>
);

const Equipment: React.FC = () => {
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
        <section id="equipment" ref={sectionRef} className={`section ${isVisible ? 'is-visible' : ''}`}>
            <div className="site-container">
                <div className="section__header reveal">
                    <p className="eyebrow">Our Equipment</p>
                    <h2 className="headline">State-of-the-art facilities</h2>
                    <p className="subhead">
                        Premium equipment from leading brands, maintained to the highest standards for your training success.
                    </p>
                </div>

                <div className="equipment-grid">
                    {EQUIPMENT_DATA.map((equipment, index) => (
                        <EquipmentCard
                            key={equipment.name}
                            equipment={equipment}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Equipment;
