import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';

interface GeneratedContent {
  instagramCaptions: string[];
  adHeadlines: string[];
}

const CopyIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
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
                model: 'gemini-2.5-flash',
                contents: 'Write 3 short Instagram post captions and 2 ad headlines for a gym campaign in India promoting fitness, strength, and transformation. The tone should be motivational and engaging for both men and women. Each caption and headline must include relevant emojis, hashtags (like #CFS9India, #FitnessIndia, #TransformYourself), and a clear call-to-action to join CFS9 gym.',
                config: {
                    responseMimeType: 'application/json',
                    responseSchema: schema,
                },
            });

            const jsonStr = response.text.trim();
            const parsedContent: GeneratedContent = JSON.parse(jsonStr);
            setContent(parsedContent);
        } catch (e) {
            console.error(e);
            setError('Failed to generate content. Please try again.');
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
        <section id="social-generator" ref={sectionRef} className={`section ${isVisible ? 'is-visible' : ''}`}>
            <div className="site-container">
                <div className="section__header reveal">
                    <p className="eyebrow">Social lab</p>
                    <h2 className="headline">Amplify your motivation</h2>
                    <p className="subhead">
                        Generate social captions and ad headlines for a CFS9 campaign with one click.
                    </p>
                </div>

                <button onClick={handleGenerate} disabled={loading} className="btn btn-primary reveal">
                    {loading ? 'Generating...' : 'Generate content'}
                </button>

                {error && <p className="subhead" style={{ marginTop: '16px' }}>{error}</p>}

                {content && (
                    <div className="grid grid-2" style={{ marginTop: '32px' }}>
                        <div className="card reveal">
                            <h3 className="headline" style={{ fontSize: '1.8rem' }}>Instagram captions</h3>
                            <div className="grid" style={{ marginTop: '16px' }}>
                                {content.instagramCaptions.map((caption, i) => (
                                    <div key={`caption-${i}`} className="card card--glass" style={{ position: 'relative' }}>
                                        <p>{caption}</p>
                                        <button
                                            onClick={() => handleCopy(caption, `caption-${i}`)}
                                            className="icon-button"
                                            style={{ position: 'absolute', top: '12px', right: '12px' }}
                                            aria-label="Copy caption"
                                        >
                                            {copiedIndex === `caption-${i}` ? <CheckIcon /> : <CopyIcon />}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="card reveal">
                            <h3 className="headline" style={{ fontSize: '1.8rem' }}>Ad headlines</h3>
                            <div className="grid" style={{ marginTop: '16px' }}>
                                {content.adHeadlines.map((headline, i) => (
                                    <div key={`headline-${i}`} className="card card--glass" style={{ position: 'relative' }}>
                                        <p>{headline}</p>
                                        <button
                                            onClick={() => handleCopy(headline, `headline-${i}`)}
                                            className="icon-button"
                                            style={{ position: 'absolute', top: '12px', right: '12px' }}
                                            aria-label="Copy headline"
                                        >
                                            {copiedIndex === `headline-${i}` ? <CheckIcon /> : <CopyIcon />}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default SocialGenerator;
