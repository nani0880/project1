import React, { useEffect, useState } from 'react';

interface Testimonial {
    name: string;
    role: string;
    image: string;
    text: string;
    rating: number;
}

const testimonials: Testimonial[] = [
    {
        name: 'Sarah Johnson',
        role: 'Fitness Enthusiast',
        image: 'https://i.pravatar.cc/150?img=1',
        text: 'CFS9 changed how I train. The coaching is precise, and the community keeps me accountable.',
        rating: 5
    },
    {
        name: 'Mike Chen',
        role: 'Professional Athlete',
        image: 'https://i.pravatar.cc/150?img=13',
        text: 'Elite equipment, smart programming, and a team that knows performance. This is where I build.',
        rating: 5
    },
    {
        name: 'Emily Rodriguez',
        role: 'Yoga Instructor',
        image: 'https://i.pravatar.cc/150?img=5',
        text: 'Mobility work and recovery are treated seriously here. I feel stronger and more balanced.',
        rating: 5
    },
    {
        name: 'David Thompson',
        role: 'Business Executive',
        image: 'https://i.pravatar.cc/150?img=12',
        text: 'Flexible hours and clear coaching plans made consistency possible with my schedule.',
        rating: 5
    }
];

const Testimonials: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % testimonials.length);
                setIsAnimating(false);
            }, 300);
        }, 6000);

        return () => clearInterval(interval);
    }, []);

    const current = testimonials[currentIndex];

    return (
        <section id="testimonials" className="section testimonials">
            <div className="site-container">
                <div className="section__header">
                    <p className="eyebrow">Community</p>
                    <h2 className="headline">Success stories</h2>
                    <p className="subhead">Real members. Real progress. Real results.</p>
                </div>

                <div className={`testimonial-card ${isAnimating ? 'is-animating' : ''}`}>
                    <div className="rating">
                        {Array.from({ length: current.rating }).map((_, index) => (
                            <span key={index} className="rating-dot"></span>
                        ))}
                    </div>
                    <p className="testimonial-text">"{current.text}"</p>
                    <div className="testimonial-author">
                        <img src={current.image} alt={current.name} />
                        <div>
                            <strong>{current.name}</strong>
                            <div className="subhead">{current.role}</div>
                        </div>
                    </div>
                </div>

                <div className="testimonial-nav">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            className={index === currentIndex ? 'is-active' : ''}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Show testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
