import React, { useEffect, useRef, useState } from 'react';

interface Trainer {
    image: string;
    name: string;
    specialty: string;
    certificates: string[];
}

const ALL_TRAINERS: Trainer[] = Array.from({ length: 13 }, (_, i) => ({
    image: `/trainers/${i + 1}.png`,
    name: `Trainer ${i + 1}`,
    specialty: '',
    certificates: []
}));

const TrainerCard: React.FC<{ trainer: Trainer; onClick: () => void }> = ({ trainer, onClick }) => (
    <div className="trainer-card reveal" onClick={onClick}>
        <div className="trainer-card__image">
            <img src={trainer.image} alt={trainer.name} loading="lazy" decoding="async" />
        </div>
    </div>
);

const Trainers: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
    const [isClosing, setIsClosing] = useState(false);
    const [page, setPage] = useState(0);
    const [fade, setFade] = useState('fade-in');
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

    useEffect(() => {
        const interval = setInterval(() => {
            setFade('fade-out');
            setTimeout(() => {
                setPage((prevPage) => (prevPage === 0 ? 1 : 0));
                setFade('fade-in');
            }, 500); // Wait for fade out to complete before changing data
        }, 4000); // Swap every 4 seconds
        return () => clearInterval(interval);
    }, []);

    const currentTrainers = page === 0 ? ALL_TRAINERS.slice(0, 6) : ALL_TRAINERS.slice(6, 13);

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

                <div className={`trainer-grid ${fade}`}>
                    {currentTrainers.map((trainer) => (
                        <TrainerCard
                            key={trainer.image}
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
