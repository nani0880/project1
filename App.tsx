import React from 'react';
import WelcomeSplash from './components/WelcomeSplash';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Founder from './components/Founder';
import Programs from './components/Programs';
import Trainers from './components/Trainers';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingSocials from './components/FloatingSocials';
import Chatbot from './components/Chatbot';
import SmoothScroll from './components/SmoothScroll';

const App: React.FC = () => {
    return (
        <div className="site">
            <SmoothScroll />
            <WelcomeSplash />
            <Navbar />
            <main className="main">
                <Home />
                <About />
                <Founder />
                <Programs />
                <Trainers />
                <Testimonials />
                <Gallery />
                <Contact />
            </main>
            <Footer />
            <FloatingSocials />
            <Chatbot />
        </div>
    );
};

export default App;
