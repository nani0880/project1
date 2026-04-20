import React, { useEffect, useRef, useState } from 'react';
import { GmailIcon } from '../constants';

const Contact: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <section id="contact" ref={sectionRef} className={`section ${isVisible ? 'is-visible' : ''}`}>
            <div className="site-container">
                <div className="section__header reveal">
                    <p className="eyebrow">Get in touch</p>
                    <h2 className="headline">Ready to train?</h2>
                    <p className="subhead">
                        Book a trial, ask about programs, or visit the facility. We will respond fast.
                    </p>
                </div>

                <div className="contact__grid">
                    <div className="card reveal">
                        <h3 className="headline contact__title">Send a message</h3>
                        <form onSubmit={handleSubmit} className="grid contact__form">
                            <input
                                type="text"
                                placeholder="Your name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="form-input"
                                required
                            />
                            <input
                                type="tel"
                                placeholder="Phone number"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="form-input"
                                required
                            />
                            <textarea
                                placeholder="Tell us about your goals"
                                rows={5}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="form-textarea"
                                required
                            ></textarea>
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </form>
                    </div>

                    <div className="contact__info">
                        <div className="card reveal">
                            <h3 className="headline contact__title">Contact details</h3>
                            <div className="grid" style={{ marginTop: '18px' }}>
                                <div className="contact__item">
                                    <div className="contact__icon">
                                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                            <path d="M12 2c-3.9 0-7 3.1-7 7 0 5.2 6.3 11.5 6.6 11.8.2.2.5.2.8 0 .3-.3 6.6-6.6 6.6-11.8 0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5s2.5 1.1 2.5 2.5S13.4 11.5 12 11.5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <strong>Address</strong>
                                        <div className="subhead">CFS9 Gym, Jubilee Hills, Hyderabad 500033</div>
                                    </div>
                                </div>

                                <div className="contact__item">
                                    <div className="contact__icon">
                                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                            <path d="M6.6 10.8c1.2 2.4 3.1 4.3 5.5 5.5l1.8-1.8c.2-.2.6-.3.9-.2 1 .3 2.1.5 3.2.5.5 0 .9.4.9.9v2.8c0 .5-.4.9-.9.9C10.3 19.4 4.6 13.7 4.6 6.8c0-.5.4-.9.9-.9h2.8c.5 0 .9.4.9.9 0 1.1.2 2.2.5 3.2.1.3 0 .7-.2.9l-1.9 1.9z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <strong>Phone</strong>
                                        <a href="tel:+919133333359" className="subhead">(+91) 91333 33359</a>
                                    </div>
                                </div>

                                <div className="contact__item">
                                    <div className="contact__icon">
                                        <GmailIcon style={{ width: 20, height: 20 }} />
                                    </div>
                                    <div>
                                        <strong>Email</strong>
                                        <a href="mailto:contact@cfs9.com" className="subhead">contact@cfs9.com</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="contact__map reveal">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.113264426515!2d78.37397227591325!3d17.45422470123985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9385b0808a97%3A0x2a9693c6f2282e4!2sCFS9%20GYM!5e0!3m2!1sen!2sus!4v1719509890104!5m2!1sen!2sus"
                                title="CFS9 Gym Location"
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                style={{ border: 0, width: '100%', height: '100%' }}
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
