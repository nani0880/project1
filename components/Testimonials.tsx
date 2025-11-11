import React, { useState, useEffect } from 'react';

interface Testimonial {
    name: string;
    role: string;
    image: string;
    text: string;
    rating: number;
}

const testimonials: Testimonial[] = [
    {
        name: "Sarah Johnson",
        role: "Fitness Enthusiast",
        image: "https://i.pravatar.cc/150?img=1",
        text: "CFS9 transformed my life! The trainers are incredible and the facilities are world-class. I've never felt stronger or more confident.",
        rating: 5
    },
    {
        name: "Mike Chen",
        role: "Professional Athlete",
        image: "https://i.pravatar.cc/150?img=13",
        text: "The best gym I've ever trained at. The equipment is top-notch and the community is so supportive. Highly recommend!",
        rating: 5
    },
    {
        name: "Emily Rodriguez",
        role: "Yoga Instructor",
        image: "https://i.pravatar.cc/150?img=5",
        text: "Amazing atmosphere and incredible programs. CFS9 helped me achieve goals I never thought possible. The staff truly cares!",
        rating: 5
    },
    {
        name: "David Thompson",
        role: "Business Executive",
        image: "https://i.pravatar.cc/150?img=12",
        text: "24/7 access is a game-changer for my busy schedule. The personalized training programs are exactly what I needed.",
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
            }, 500);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const goToSlide = (index: number) => {
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentIndex(index);
            setIsAnimating(false);
        }, 500);
    };

    const current = testimonials[currentIndex];

    return (
        <section className="relative py-20 md:py-32 overflow-hidden" style={{ backgroundColor: '#0A0A0A' }}>
            {/* Background Effect */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600 rounded-full filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-7xl font-black mb-4">
                        <span className="text-white">SUCCESS </span>
                        <span style={{ color: '#FF0000', textShadow: '0 0 30px rgba(255, 0, 0, 0.8)' }}>STORIES</span>
                    </h2>
                    <p className="text-xl text-white/80">Hear from our amazing community</p>
                </div>

                {/* Testimonial Card */}
                <div className="max-w-4xl mx-auto">
                    <div 
                        className="p-8 md:p-12 rounded-3xl transition-all duration-500"
                        style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            backdropFilter: 'blur(20px)',
                            transform: isAnimating ? 'scale(0.95) rotateY(10deg)' : 'scale(1) rotateY(0deg)',
                            opacity: isAnimating ? 0.5 : 1
                        }}
                    >
                        {/* Rating Stars */}
                        <div className="flex justify-center mb-6">
                            {[...Array(current.rating)].map((_, i) => (
                                <span key={i} className="text-3xl mx-1" style={{ color: '#FF0000' }}>★</span>
                            ))}
                        </div>

                        {/* Testimonial Text */}
                        <p className="text-xl md:text-2xl text-white text-center mb-8 leading-relaxed italic">
                            "{current.text}"
                        </p>

                        {/* Author Info */}
                        <div className="flex items-center justify-center space-x-4">
                            <img 
                                src={current.image} 
                                alt={current.name}
                                className="w-16 h-16 rounded-full border-2"
                                style={{ borderColor: '#FF0000' }}
                            />
                            <div>
                                <h4 className="text-xl font-bold text-white">{current.name}</h4>
                                <p className="text-white/70">{current.role}</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Dots */}
                    <div className="flex justify-center mt-8 space-x-3">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className="w-3 h-3 rounded-full transition-all duration-300"
                                style={{
                                    backgroundColor: index === currentIndex ? '#FF0000' : 'rgba(255, 255, 255, 0.3)',
                                    transform: index === currentIndex ? 'scale(1.5)' : 'scale(1)',
                                    boxShadow: index === currentIndex ? '0 0 20px rgba(255, 0, 0, 0.8)' : 'none'
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
