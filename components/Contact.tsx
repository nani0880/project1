import React, { useState, useEffect, useRef } from 'react';
import { GmailIcon } from '../constants';

const Contact: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
    const sectionRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add form submission logic here
    };

    return (
        <section 
            id="contact" 
            ref={sectionRef} 
            className="relative min-h-screen py-20 md:py-32 overflow-hidden"
        >
            {/* Background Video */}
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: 'brightness(0.2)' }}
            >
                <source src="https://cdn.pixabay.com/video/2022/11/07/138570-768834088_large.mp4" type="video/mp4" />
            </video>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 
                        className="text-6xl md:text-8xl font-black tracking-tight mb-4 animate-fadeInDown"
                        style={{ 
                            color: '#FFFFFF',
                            textShadow: '0 4px 12px rgba(0,0,0,1)',
                            opacity: isVisible ? 1 : 0,
                            animationDelay: '0.2s',
                            animationFillMode: 'forwards'
                        }}
                    >
                        GET IN <span style={{ color: '#FF0000', textShadow: '0 0 30px rgba(255, 0, 0, 0.8), 0 4px 12px rgba(0,0,0,1)' }}>TOUCH</span>
                    </h2>
                    <p 
                        className="text-xl text-white max-w-3xl mx-auto animate-fadeInUp"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            animationDelay: '0.3s',
                            animationFillMode: 'forwards',
                            textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                        }}
                    >
                        Ready to start your transformation? Contact us today or visit our facility
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Contact Form - Glass Panel */}
                    <div 
                        className="glass p-8 md:p-10 animate-fadeInLeft"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            animationDelay: '0.5s',
                            animationFillMode: 'forwards'
                        }}
                    >
                        <h3 className="text-3xl font-bold mb-6 text-white">Send us a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full glass p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 rounded-lg"
                                    style={{ 
                                        focusRingColor: '#00E676',
                                        background: 'rgba(255, 255, 255, 0.05)'
                                    }}
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="tel"
                                    placeholder="Your Phone Number"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full glass p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 rounded-lg"
                                    style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                                    required
                                />
                            </div>
                            <div>
                                <textarea
                                    placeholder="Your Message"
                                    rows={5}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full glass p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 rounded-lg resize-none"
                                    style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-4 rounded-full text-lg font-bold transition-all duration-300"
                                style={{
                                    backgroundColor: '#FF0000',
                                    color: '#FFFFFF',
                                    boxShadow: '0 0 20px rgba(255, 0, 0, 0.5)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 0, 0, 0.8)';
                                    e.currentTarget.style.transform = 'scale(1.02)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 0, 0, 0.5)';
                                    e.currentTarget.style.transform = 'scale(1)';
                                }}
                            >
                                SUBMIT
                            </button>
                        </form>
                    </div>

                    {/* Contact Info - Glass Panel */}
                    <div 
                        className="space-y-6 animate-fadeInRight"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            animationDelay: '0.6s',
                            animationFillMode: 'forwards'
                        }}
                    >
                        <div className="glass p-8">
                            <h3 className="text-3xl font-bold mb-6 text-white">Contact Information</h3>
                            
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="text-3xl" style={{ color: '#FF0000' }}>📍</div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white mb-1">Address</h4>
                                        <p className="text-gray-300">CFS9 Gym, Kondapur, Hyderabad, Telangana 500084</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="text-3xl" style={{ color: '#FF0000' }}>📞</div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white mb-1">Phone</h4>
                                        <a href="tel:+919133333359" className="text-gray-300 hover:text-red-500 transition-colors">
                                            (+91) 91333 33359
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <GmailIcon className="w-8 h-8" style={{ color: '#FF0000' }} />
                                    <div>
                                        <h4 className="text-xl font-bold text-white mb-1">Email</h4>
                                        <a href="mailto:contact@cfs9.com" className="text-gray-300 hover:text-red-500 transition-colors">
                                            contact@cfs9.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="glass p-2 h-80 overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.113264426515!2d78.37397227591325!3d17.45422470123985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9385b0808a97%3A0x2a9693c6f2282e4!2sCFS9%20GYM!5e0!3m2!1sen!2sus!4v1719509890104!5m2!1sen!2sus"
                                className="w-full h-full rounded-lg"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="CFS9 Gym Location"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
