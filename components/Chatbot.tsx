import React, { useState, useEffect, useRef } from 'react';

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
        { sender: 'bot', text: "Hi there! I'm the CFS9 assistant. To get you started, what's your name?" }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [step, setStep] = useState<ChatStep>('initial');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleOpen = () => {
        setIsOpen(true);
        setIsClosing(false);
    };

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsOpen(false);
        }, 300); // match animation duration
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || step === 'completed') return;

        const userMessage: Message = { sender: 'user', text: inputValue };
        setMessages(prev => [...prev, userMessage]);
        
        if (step === 'initial') {
            const name = inputValue.trim();
            setTimeout(() => {
                setMessages(prev => [...prev, { sender: 'bot', text: `Great to meet you, ${name}! What's your phone number?` }]);
                setStep('askedName');
            }, 500);
        } else if (step === 'askedName') {
            setTimeout(() => {
                setMessages(prev => [...prev, { sender: 'bot', text: "Thanks! A member of our team will reach out to you shortly. Get ready to transform! 💪" }]);
                setStep('completed');
            }, 500);
        }

        setInputValue('');
    };
    
    const getPlaceholder = () => {
        switch(step) {
            case 'initial': return 'Type your name...';
            case 'askedName': return 'Type your phone number...';
            default: return 'Our team will be in touch!';
        }
    }


    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Chat Window */}
            {isOpen && (
                <div className={`w-80 sm:w-96 h-[500px] bg-gray-900 rounded-2xl shadow-2xl flex flex-col origin-bottom-right ${isClosing ? 'animate-slideOutDown' : 'animate-slideInUp'}`}>
                    {/* Header */}
                    <div className="bg-gray-800 p-4 flex justify-between items-center rounded-t-2xl">
                        <div>
                            <h3 className="text-lg font-bold text-white">CFS9 Assistant</h3>
                            <p className="text-xs text-red-500">Online</p>
                        </div>
                        <button onClick={handleClose} className="text-gray-400 hover:text-white transition-colors" aria-label="Close chat">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
                                <div className={`max-w-[80%] p-3 rounded-xl ${msg.sender === 'bot' ? 'bg-gray-700 text-white rounded-bl-none' : 'bg-red-500 text-white rounded-br-none'}`}>
                                    <p className="text-sm">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                         <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-3 border-t border-gray-700">
                        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder={getPlaceholder()}
                                disabled={step === 'completed'}
                                className="flex-1 w-full bg-gray-800 border-2 border-gray-700 rounded-full py-2 px-4 text-white focus:outline-none focus:border-red-500 transition-colors"
                            />
                            <button type="submit" disabled={step === 'completed'} className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" aria-label="Send message">
                                <SendIcon className="w-5 h-5"/>
                            </button>
                        </form>
                    </div>
                </div>
            )}
            
            {/* Chat Bubble */}
            {!isOpen && (
                 <button onClick={handleOpen} className="bg-red-500 text-white p-4 rounded-full shadow-2xl hover:bg-red-600 transition-all duration-300 transform hover:scale-110 animate-fadeIn" aria-label="Open chat">
                    <ChatIcon className="w-8 h-8"/>
                </button>
            )}

        </div>
    );
};

export default Chatbot;