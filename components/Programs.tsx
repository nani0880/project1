import React, { useEffect, useRef, useState } from 'react';
import { PROGRAMS_DATA } from '../constants';
import type { Program } from '../types';

const ProgramCard: React.FC<{
    program: Program;
    index: number;
    isActive: boolean;
    onHover: () => void;
}> = ({ program, index, isActive, onHover }) => (
    <div
        className={`program-card reveal ${isActive ? 'is-active' : ''}`}
        onMouseEnter={onHover}
        style={{ transitionDelay: `${0.1 + index * 0.1}s` }}
    >
        <div className="program-icon">{program.icon}</div>
        <h3>{program.title}</h3>
        <p>{program.description}</p>
        <div style={{ marginTop: '18px' }}>
            <a href="#contact" className="btn btn-outline">Learn more</a>
        </div>
    </div>
);

const Programs: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
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
        <section id="programs" ref={sectionRef} className={`section ${isVisible ? 'is-visible' : ''}`}>
            <div className="site-container">
                <div className="section__header reveal">
                    <p className="eyebrow">Programs</p>
                    <h2 className="headline">Built for transformation</h2>
                    <p className="subhead">
                        Structured training paths designed to build strength, athleticism, and
                        confidence with measurable progress.
                    </p>
                </div>

                <div className="programs__grid">
                    {PROGRAMS_DATA.map((program, index) => (
                        <ProgramCard
                            key={program.title}
                            program={program}
                            index={index}
                            isActive={activeIndex === index}
                            onHover={() => setActiveIndex(index)}
                        />
                    ))}
                </div>

                <div className="card programs__note reveal">
                    <p>
                        Every program includes coaching check-ins, progress tracking, and nutrition
                        support. Book a consultation to match your goals with the right plan.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Programs;
