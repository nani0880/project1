import React, { useEffect, useState } from 'react';
import { Logo } from './Home';

const WelcomeSplash: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isAnimating, setIsAnimating] = useState(true);

    useEffect(() => {
        const exitTimer = setTimeout(() => {
            setIsAnimating(false);
        }, 2000);

        const removeTimer = setTimeout(() => {
            setIsVisible(false);
        }, 2400);

        return () => {
            clearTimeout(exitTimer);
            clearTimeout(removeTimer);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div className={`splash ${isAnimating ? '' : 'splash--exit'}`}>
            <div className="splash__card">
                <img src="/logo.png" alt="CFS9 Logo" className="splash__logo-image" />
                <Logo className="splash__logo" />
                <div className="splash__tagline">Train. Transform. Triumph.</div>
                <div className="splash__bar">
                    <span></span>
                </div>
            </div>
        </div>
    );
};

export default WelcomeSplash;
