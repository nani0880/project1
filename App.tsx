import React from 'react';
import WelcomeSplash from './components/WelcomeSplash';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Founder from './components/Founder';
import Programs from './components/Programs';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingSocials from './components/FloatingSocials';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
    return (
        <div style={{ backgroundColor: '#0A0A0A', color: '#fff' }}>
            <WelcomeSplash />
            <Navbar />
            <main>
                <Home />
                <About />
                <Founder />
                <Programs />
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