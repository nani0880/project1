import React, { useEffect, useRef, useState } from 'react';
import { TRAINERS_DATA } from '../constants';
import type { Trainer } from '../types';

const TrainerCard: React.FC<{
    trainer: Trainer;
    onClick: () => void;
}> = ({ trainer, onClick }) => (
    <div className="trainer-card reveal" onClick={onClick}>
        <img src={trainer.image} alt={trainer.name} />
        <div className="trainer-card__info">
            <div className="trainer-card__name">{trainer.name}</div>
            <div className="trainer-card__role">{trainer.specialty}</div>
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
                    <p className="eyebrow">Coaching team</p>
                    <h2 className="headline">Meet the trainers</h2>
                    <p className="subhead">
                        Certified specialists who bring structure, intensity, and accountability to
                        every session.
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
                        <img src={selectedTrainer.image} alt={selectedTrainer.name} />
                        <div className="modal-content">
                            <h3 className="headline modal-title">
                                {selectedTrainer.name}
                            </h3>
                            <p className="subhead">{selectedTrainer.specialty}</p>
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
