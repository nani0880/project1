import React from 'react';

const Testimonials: React.FC = () => {
    return (
        <section id="testimonials" className="section testimonials">
            <div className="site-container">
                <div className="section__header">
                    <p className="eyebrow">Community</p>
                    <h2 className="headline">Success stories</h2>
                    <p className="subhead">Real members. Real progress. Real results.</p>
                </div>

                <div className="instagram-reel-container">
                    <div className="instagram-reel-card card card--glass">
                        <p className="eyebrow">Featured Success</p>
                        <h3 className="card__title">Transformation Journey</h3>
                        <div className="instagram-reel-embed">
                            <iframe
                                src="https://www.instagram.com/reel/DWnScbOEv5x/embed"
                                width="100%"
                                height="580"
                                frameBorder="0"
                                scrolling="no"
                                allowTransparency={true}
                                allow="encrypted-media"
                                loading="lazy"
                                title="CFS Gym Success Story"
                            ></iframe>
                        </div>
                        <a 
                            href="https://www.instagram.com/reel/DWnScbOEv5x/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn btn-outline"
                        >
                            View on Instagram
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
