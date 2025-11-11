import React, { useState, useEffect, useRef } from 'react';
import { TRAINERS_DATA } from '../constants';
import type { Trainer } from '../types';

const TrainerCard: React.FC<{ trainer: Trainer; className?: string; style?: React.CSSProperties; onClick: () => void; }> = ({ trainer, className, style, onClick }) => (
    <div className={`relative group overflow-hidden rounded-lg shadow-xl cursor-pointer ${className}`} style={style} onClick={onClick}>
        <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6">
            <h3 className="text-3xl font-bold text-white">{trainer.name}</h3>
            <p className="text-red-500 font-semibold tracking-wider">{trainer.specialty}</p>
        </div>
    </div>
);

const Trainers: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = sectionRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    const openModal = (trainer: Trainer) => {
        setSelectedTrainer(trainer);
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    };

    const closeModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            setSelectedTrainer(null);
            setIsClosing(false);
            document.body.style.overflow = 'auto'; // Restore scroll
        }, 300); // Match animation duration
    };

    const animationClass = (baseClass: string, delay?: string) => isVisible ? `${baseClass} ${delay || ''}` : 'opacity-0';

    return (
        <section id="trainers" ref={sectionRef} className="py-20 md:py-32 bg-gray-950 overflow-hidden">
            <div className="container mx-auto px-6 text-center">
                <h2 className={`text-5xl md:text-6xl font-bold tracking-wider text-red-500 ${animationClass('animate-fadeInUp')}`}>MEET OUR TRAINERS</h2>
                <p className={`text-lg text-gray-300 max-w-2xl mx-auto mt-4 mb-16 ${animationClass('animate-fadeInUp', 'delay-200')}`}>
                    Our certified and experienced trainers are here to guide you, motivate you, and help you reach your full potential.
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {TRAINERS_DATA.map((trainer, index) => (
                        <TrainerCard 
                            key={index} 
                            trainer={trainer}
                            className={isVisible ? 'animate-fadeInUp' : 'opacity-0'}
                            style={{ animationDelay: `${400 + index * 150}ms` }}
                            onClick={() => openModal(trainer)}
                        />
                    ))}
                </div>
            </div>
            
            {selectedTrainer && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={closeModal}>
                    <div
                        className={`relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl max-w-3xl w-full ${isClosing ? 'animate-modalOut' : 'animate-modalIn'}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img src={selectedTrainer.image} alt={selectedTrainer.name} className="w-full h-auto object-contain max-h-[80vh]" />
                         <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent">
                            <h3 className="text-4xl font-bold text-white">{selectedTrainer.name}</h3>
                            <p className="text-xl text-red-500 font-semibold">{selectedTrainer.specialty}</p>
                        </div>
                        <button onClick={closeModal} className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/80 transition-colors z-10" aria-label="Close image view">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Trainers;