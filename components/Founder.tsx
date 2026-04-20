import React, { useEffect, useRef, useState } from 'react';

const Founder: React.FC = () => {
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

    return (
        <section id="founder" ref={sectionRef} className={`section ${isVisible ? 'is-visible' : ''}`}>
            <div className="site-container">
                <div className="section__header reveal">
                    <p className="eyebrow">The Founder</p>
                    <h2 className="headline">Satish Bachala</h2>
                    <p className="subhead">
                        The coach and entrepreneur behind CFS9 Gym. A leader who built a culture of
                        discipline, coaching, and life changing transformation.
                    </p>
                </div>

                <div className="founder__grid">
                    <div className="reveal">
                        <p>
                            Satish Bachala founded CFS9 Gym in 2008 and has guided thousands of
                            members in Jubilee Hills and across Hyderabad. His approach combines science backed training,
                            consistent mentorship, and a deep belief that fitness reshapes mindset.
                        </p>
                        <p>
                            Starting as a personal trainer, Satish earned recognition for delivering
                            real results. Today, he continues to shape one of the most trusted premium
                            fitness brands in the city.
                        </p>

                        <div className="card card--glass founder__highlight">
                            <h4>Milestone moment</h4>
                            <p>
                                CFS9 hosted legendary bodybuilder Ronnie Coleman for a special visit,
                                confirming the brand as a serious global contender.
                            </p>
                        </div>

                        <p>
                            CFS9 is designed as a full wellness ecosystem with luxury facilities,
                            smart programming, and a high performance culture that attracts
                            professionals, athletes, and newcomers alike.
                        </p>
                    </div>

                    <div className="founder__media reveal">
                        <img src="/founder/13.jpg" alt="Satish Bachala, founder of CFS9 Gym" />
                        <img src="/founder/6.jpg" alt="Satish Bachala with Ronnie Coleman" />
                    </div>
                </div>

                <div className="milestone-grid">
                    <div className="card milestone-card reveal">
                        <div className="milestone-value">2008</div>
                        <p>Founded CFS9 Gym</p>
                    </div>
                    <div className="card milestone-card reveal reveal--delay-1">
                        <div className="milestone-value">2023</div>
                        <p>Ronnie Coleman visit</p>
                    </div>
                    <div className="card milestone-card reveal reveal--delay-2">
                        <div className="milestone-value">2023</div>
                        <p>S9 Classic Expo</p>
                    </div>
                </div>

                <div className="card founder__quote reveal">
                    <p className="headline">
                        "Create life changing fitness experiences in a premium, science backed
                        environment."
                    </p>
                    <p className="subhead">- Satish Bachala</p>
                </div>
            </div>
        </section>
    );
};

export default Founder;
