import React, { useEffect, useRef, useState } from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`logo ${className || ''}`}>
        <span>CF</span>
        <span className="logo__accent">S</span>
    </div>
);

const Home: React.FC = () => {
    const [videoLoaded, setVideoLoaded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [imageFallback, setImageFallback] = useState(true);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const playVideo = async () => {
            try {
                await video.play();
                setImageFallback(false);
            } catch {
                setVideoLoaded(false);
                setImageFallback(true);
            }
        };

        // Delay video load to prioritize initial render
        const timer = setTimeout(playVideo, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section id="home" className="hero section">
            <div className="hero__media">
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="none"
                    className={`hero__video ${videoLoaded ? 'is-loaded' : ''}`}
                    onLoadedData={() => setVideoLoaded(true)}
                    onError={() => setVideoLoaded(false)}
                    style={{ willChange: 'opacity' }}
                    poster="/welcome-image.jpg"
                >
                    <source src="/home-video.mp4" type="video/mp4" />
                </video>
                {imageFallback && (
                    <img
                        src="/welcome-image.jpg"
                        alt="CFS Gym training floor"
                        className="hero__fallback"
                        loading="eager"
                        decoding="async"
                        width="1920"
                        height="1080"
                    />
                )}
                <div className="hero__overlay"></div>
            </div>

            <div className="site-container hero__content">
                <div>
                    <p className="eyebrow">Jubilee Hills, Hyderabad</p>
                    <h1 className="hero__title">Transform Your Body</h1>
                    <p className="hero__subtitle">
                        Elite fitness destination with premium equipment, expert trainers, and 
                        personalized training programs designed for results.
                    </p>
                    <div className="hero__actions">
                        <a href="#contact" className="btn btn-primary">Book a trial</a>
                        <a href="#programs" className="btn btn-ghost">View programs</a>
                    </div>
                    <div className="hero__stats">
                        <div className="stat-card">
                            <div className="stat-value">500+</div>
                            <div className="stat-label">Active members</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">15</div>
                            <div className="stat-label">Elite coaches</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">24/7</div>
                            <div className="stat-label">Access</div>
                        </div>
                    </div>
                </div>

                <div className="hero__panel">
                    <div className="card card--glass">
                        <p className="eyebrow">CFS access</p>
                        <h3 className="hero__panel-title">Open day and night</h3>
                        <p className="subhead">
                            Jubilee Hills location. Personal training, group classes,
                            nutrition support, and recovery zones.
                        </p>
                        <div className="hero__badge-row">
                            <span className="badge">Strength</span>
                            <span className="badge">Conditioning</span>
                            <span className="badge">Mobility</span>
                            <span className="badge">Recovery</span>
                        </div>
                        <a href="#contact" className="btn btn-outline">Talk to a coach</a>
                    </div>
                    <div className="card card--glass">
                        <p className="eyebrow">Today at CFS</p>
                        <ul className="hero__schedule">
                            <li>
                                <span>6:00 AM</span>
                                Power Lift Lab
                            </li>
                            <li>
                                <span>12:00 PM</span>
                                Mobility Reset
                            </li>
                            <li>
                                <span>7:00 PM</span>
                                Conditioning Circuit
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;
