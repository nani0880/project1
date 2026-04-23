import React, { useEffect, useRef, useState } from 'react';

interface Trainer {
    image: string;
    name: string;
    specialty: string;
    certificates: string[];
}

const TRAINERS_DATA: Trainer[] = [
    {
        image: '/gallery/4.jpg',
        name: 'Rajesh Kumar',
        specialty: 'Strength & Conditioning',
        certificates: ['/gallery/13.jpg', '/gallery/14.jpg']
    },
    {
        image: '/gallery/5.jpg',
        name: 'Priya Sharma',
        specialty: 'Personal Training',
        certificates: ['/gallery/13.jpg']
    },
    {
        image: '/gallery/6.jpg',
        name: 'Arjun Reddy',
        specialty: 'Cardio & High Intensity',
        certificates: ['/gallery/14.jpg', '/gallery/13.jpg']
    },
    {
        image: '/gallery/7.jpg',
        name: 'Sneha Patel',
        specialty: 'Yoga & Flexibility',
        certificates: ['/gallery/14.jpg']
    },
    {
        image: '/gallery/8.jpg',
        name: 'Vikram Singh',
        specialty: 'CrossFit Training',
        certificates: ['/gallery/13.jpg', '/gallery/14.jpg']
    },
    {
        image: '/gallery/1.jpg',
        name: 'Ananya Desai',
        specialty: 'Nutrition & Wellness',
        certificates: ['/gallery/14.jpg']
    }
];

const TrainerCard: React.FC<{ trainer: Trainer; onClick: () => void }> = ({ trainer, onClick }) => (
    <div className="trainer-card reveal" onClick={onClick}>
        <div className="trainer-card__image">
            <img src={trainer.image} alt={trainer.name} loading="lazy" decoding="async" />
        </div>
        <div className="trainer-card__info">
            <div className="trainer-card__name">{trainer.name}</div>
            <div className="trainer-card__role">{trainer.specialty}</div>
            <div className="trainer-card__certs">
                {trainer.certificates.length} Certificate{trainer.certificates.length > 1 ? 's' : ''}
            </div>
        </div>
    </div>
);

const Trainers: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
    const [isClosing, setIsClosing] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observerRef = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observerRef.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: '100px' }
        );

        if (sectionRef.current) observerRef.observe(sectionRef.current);
        return () => observerRef.disconnect();
    }, []);

    const openModal = (trainer: Trainer) => {
        setSelectedTrainer(trainer);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            setSelectedTrainer(null);
            setIsClosing(false);
            document.body.style.overflow = 'auto';
        }, 300);
    };

    return (
        <section id="trainers" ref={sectionRef} className={`section ${isVisible ? 'is-visible' : ''}`}>
            <div className="site-container">
                <div className="section__header reveal">
                    <p className="eyebrow">Our Trainers</p>
                    <h2 className="headline">Expert coaching team</h2>
                    <p className="subhead">
                        Certified professionals dedicated to helping you achieve your fitness goals with personalized training programs.
                    </p>
                </div>

                <div className="trainer-grid">
                    {TRAINERS_DATA.map((trainer) => (
                        <TrainerCard
                            key={trainer.name}
                            trainer={trainer}
                            onClick={() => openModal(trainer)}
                        />
                    ))}
                </div>
            </div>

            {selectedTrainer && (
                <div className="modal-backdrop" onClick={closeModal}>
                    <div
                        className={`modal-card ${isClosing ? 'is-closing' : ''}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img src={selectedTrainer.image} alt={selectedTrainer.name} loading="lazy" decoding="async" />
                        <div className="modal-content">
                            <h3 className="headline modal-title">{selectedTrainer.name}</h3>
                            <p className="subhead">{selectedTrainer.specialty}</p>
                            
                            <div className="modal-certificates">
                                <h4>Certifications</h4>
                                <div className="certificate-grid">
                                    {selectedTrainer.certificates.map((cert, index) => (
                                        <img 
                                            key={index} 
                                            src={cert} 
                                            alt={`Certificate ${index + 1}`} 
                                            className="certificate-image"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    ))}
                                </div>
                            </div>
                            
                            <button
                                onClick={closeModal}
                                className="btn btn-ghost modal-close"
                                aria-label="Close profile"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Trainers;
