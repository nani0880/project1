import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Type } from "@google/genai";

interface GeneratedContent {
  instagramCaptions: string[];
  adHeadlines: string[];
}

const CopyIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const CheckIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);


const SocialGenerator: React.FC = () => {
    const [content, setContent] = useState<GeneratedContent | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = sectionRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);
    
    const animationClass = (baseClass: string, delay?: string) => isVisible ? `${baseClass} ${delay || ''}` : 'opacity-0';

    const handleGenerate = async () => {
        setLoading(true);
        setError(null);
        setContent(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            
            const schema = {
              type: Type.OBJECT,
              properties: {
                instagramCaptions: {
                  type: Type.ARRAY,
                  description: 'Array of 3 short Instagram post captions.',
                  items: { type: Type.STRING },
                },
                adHeadlines: {
                  type: Type.ARRAY,
                  description: 'Array of 2 ad headlines.',
                  items: { type: Type.STRING },
                },
              },
              required: ['instagramCaptions', 'adHeadlines'],
            };

            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: "Write 3 short Instagram post captions and 2 ad headlines for a gym campaign in India promoting fitness, strength, and transformation. The tone should be motivational and engaging for both men and women. Each caption and headline must include relevant emojis, hashtags (like #CFS9India, #FitnessIndia, #TransformYourself), and a clear call-to-action to join CFS9 gym.",
                config: {
                    responseMimeType: "application/json",
                    responseSchema: schema,
                },
            });
            
            const jsonStr = response.text.trim();
            const parsedContent: GeneratedContent = JSON.parse(jsonStr);
            setContent(parsedContent);

        } catch (e) {
            console.error(e);
            setError("Failed to generate content. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = (text: string, id: string) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
            setCopiedIndex(id);
            setTimeout(() => setCopiedIndex(null), 2000);
        }
    };

    return (
        <section id="social-generator" ref={sectionRef} className="py-20 md:py-32 bg-gray-950">
            <div className="container mx-auto px-6 text-center">
                <h2 className={`text-5xl md:text-6xl font-bold tracking-wider text-red-500 ${animationClass('animate-fadeInUp')}`}>AMPLIFY YOUR MOTIVATION</h2>
                <p className={`text-lg text-gray-300 max-w-2xl mx-auto mt-4 mb-8 ${animationClass('animate-fadeInUp', 'delay-200')}`}>
                    Need some inspiration for your social media? Click the button below to generate motivational captions and headlines for your fitness campaign, powered by AI.
                </p>
                <button 
                    onClick={handleGenerate} 
                    disabled={loading}
                    className={`bg-red-500 text-white font-bold py-4 px-10 rounded-full text-xl hover:bg-red-600 transition-all duration-300 transform hover:scale-105 inline-block disabled:opacity-50 disabled:cursor-not-allowed ${animationClass('animate-fadeInUp', 'delay-400')}`}
                >
                    {loading ? 'Generating...' : 'Generate Social Content'}
                </button>

                {error && <p className="text-red-500 mt-8 text-lg">{error}</p>}

                {content && (
                    <div className="mt-16 text-left animate-fadeIn">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-3xl font-bold text-white mb-6 text-center">Instagram Captions</h3>
                                <div className="space-y-4">
                                    {content.instagramCaptions.map((caption, i) => (
                                        <div key={`caption-${i}`} className="bg-gray-800 p-6 rounded-lg relative">
                                            <p className="text-gray-300 whitespace-pre-line">{caption}</p>
                                            <button onClick={() => handleCopy(caption, `caption-${i}`)} className="absolute top-3 right-3 p-2 text-gray-400 hover:text-red-500 transition-colors" aria-label="Copy caption">
                                                {copiedIndex === `caption-${i}` ? <CheckIcon className="w-5 h-5 text-red-500" /> : <CopyIcon className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                             <div>
                                <h3 className="text-3xl font-bold text-white mb-6 text-center">Ad Headlines</h3>
                                <div className="space-y-4">
                                    {content.adHeadlines.map((headline, i) => (
                                        <div key={`headline-${i}`} className="bg-gray-800 p-6 rounded-lg relative">
                                            <p className="text-gray-300 whitespace-pre-line">{headline}</p>
                                             <button onClick={() => handleCopy(headline, `headline-${i}`)} className="absolute top-3 right-3 p-2 text-gray-400 hover:text-red-500 transition-colors" aria-label="Copy headline">
                                                {copiedIndex === `headline-${i}` ? <CheckIcon className="w-5 h-5 text-red-500" /> : <CopyIcon className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default SocialGenerator;