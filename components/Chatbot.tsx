import React, { useEffect, useRef, useState } from 'react';

const ChatIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
    </svg>
);

const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
    </svg>
);

type Message = {
    sender: 'bot' | 'user';
    text: string;
};

type ChatStep = 'initial' | 'askedName' | 'askedPhone' | 'completed';

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'bot', text: "Hi there! I'm the CFS9 assistant. What's your name?" }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [step, setStep] = useState<ChatStep>('initial');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleOpen = () => {
        setIsOpen(true);
        setIsClosing(false);
    };

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsOpen(false);
        }, 300);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || step === 'completed') return;

        const userMessage: Message = { sender: 'user', text: inputValue };
        setMessages(prev => [...prev, userMessage]);

        if (step === 'initial') {
            const name = inputValue.trim();
            setTimeout(() => {
                setMessages(prev => [...prev, { sender: 'bot', text: `Great to meet you, ${name}. What is your phone number?` }]);
                setStep('askedName');
            }, 500);
        } else if (step === 'askedName') {
            setTimeout(() => {
                setMessages(prev => [...prev, { sender: 'bot', text: 'Thanks. Our team will reach out shortly to set up your trial.' }]);
                setStep('completed');
            }, 500);
        }

        setInputValue('');
    };

    const getPlaceholder = () => {
        switch (step) {
            case 'initial':
                return 'Type your name';
            case 'askedName':
                return 'Type your phone number';
            default:
                return 'We will be in touch';
        }
    };

    return (
        <div className="chatbot">
            {isOpen && (
                <div className={`chatbot__window ${isClosing ? 'is-closing' : ''}`}>
                    <div className="chatbot__header">
                        <div>
                            <strong>CFS9 Assistant</strong>
                            <div className="subhead">Online</div>
                        </div>
                        <button onClick={handleClose} aria-label="Close chat">
                            x
                        </button>
                    </div>

                    <div className="chatbot__messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`chatbot__bubble chatbot__bubble--${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <form className="chatbot__input" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={getPlaceholder()}
                            disabled={step === 'completed'}
                        />
                        <button type="submit" disabled={step === 'completed'} aria-label="Send message">
                            <SendIcon />
                        </button>
                    </form>
                </div>
            )}

            {!isOpen && (
                <button onClick={handleOpen} className="chatbot__button" aria-label="Open chat">
                    <ChatIcon />
                </button>
            )}
        </div>
    );
};

export default Chatbot;
