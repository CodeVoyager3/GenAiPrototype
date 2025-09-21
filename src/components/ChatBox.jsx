import React, { useState, useContext, useRef, useEffect } from "react";
import { AnalysisContext } from '../context/AnalysisContext';

// --- Enhanced ICONS ---
const MinimizeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 group-hover:text-blue-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
    </svg>
);

const MaximizeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-400 group-hover:text-emerald-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4h4m8 0h4v4m0 8v4h-4m-8 0H4v-4" />
    </svg>
);

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
);

const BotIcon = () => (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white text-sm font-bold shadow-lg">
        AI
    </div>
);

const UserIcon = () => (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold shadow-lg">
        You
    </div>
);

// Helper function to call the Groq API (enhanced error handling)
const getGroqChatCompletion = async (userMessage, analysisData) => {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!apiKey) {
        throw new Error("Groq API key is not configured.");
    }
    
    const resumeSummary = analysisData
        ? `
        Here is the user's resume analysis summary:
        - Overall Score: ${analysisData.overallScore}
        - Suitable Roles: ${analysisData.careerRecommendations.suitableRoles.join(', ')}
        - Skills to Improve: ${analysisData.careerRecommendations.skillsToImprove.join(', ')}
        `
        : "The user has not provided a resume yet.";
        
    const prompt = `
        You are a helpful career assistant chatbot integrated into a website called "Elevate".
        Your goal is to provide supportive and insightful career guidance in concise.
        ${resumeSummary}
        Based on this context, please answer the following user question: "${userMessage}"
        Keep your response concise but helpful, and format it nicely for a chat interface.
    `;
    
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            messages: [{ role: 'user', content: prompt }],
            model: 'llama-3.1-8b-instant',
            temperature: 0.7,
            max_tokens: 512
        }),
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || "Failed to fetch response from Groq API.");
    }
    
    const data = await response.json();
    return data.choices[0]?.message?.content || "Sorry, I couldn't get a response.";
};

// Enhanced typing animation component
const TypingIndicator = () => (
    <div className="flex items-center space-x-2 p-4 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-700/40 border border-emerald-500/20 max-w-[80%]">
        <BotIcon />
        <div className="flex space-x-1">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        <span className="text-slate-300 text-sm ml-2">AI is thinking...</span>
    </div>
);

const ChatBox = () => {
    const { analysisData } = useContext(AnalysisContext);
    const [messages, setMessages] = useState([
        { 
            text: "👋 Hello! I'm your AI career assistant. I'm here to help you navigate your career path, analyze opportunities, and provide personalized guidance. How can I assist you today?", 
            sender: "assistant",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isMinimized, setIsMinimized] = useState(true);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (!isMinimized) {
            scrollToBottom();
            // Focus input when maximized
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [messages, isMinimized]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;
        
        const userMessage = { 
            text: input, 
            sender: "user",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);
        
        try {
            const assistantResponse = await getGroqChatCompletion(input, analysisData);
            setMessages(prev => [...prev, { 
                text: assistantResponse, 
                sender: "assistant",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, { 
                text: "😔 Sorry, I'm having trouble connecting right now. Please try again in a moment.", 
                sender: "assistant",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className={`
            font-mono bg-gradient-to-br from-slate-800/60 via-slate-900/80 to-indigo-900/60 
            backdrop-blur-xl border border-emerald-500/30 text-emerald-300
            shadow-2xl shadow-emerald-500/20 flex flex-col transition-all duration-500 ease-in-out 
            rounded-3xl overflow-hidden relative
            ${isMinimized ? 'h-16' : 'h-[600px] w-full'}
        `}>
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 via-blue-400/5 to-violet-400/5 animate-pulse"></div>
            
            {/* Header */}
            <div className="relative z-10 flex justify-between items-center p-4 border-b border-emerald-500/30 bg-slate-900/50 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                        <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                        <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                        <div className="w-3 h-3 bg-violet-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                    </div>
                    <h3 className="font-bold text-lg bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                        AI Career Assistant
                    </h3>
                    {analysisData && (
                        <span className="text-xs bg-emerald-400/20 text-emerald-300 px-2 py-1 rounded-full border border-emerald-400/30">
                            Resume Analyzed
                        </span>
                    )}
                </div>
                <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="group p-2 cursor-pointer hover:bg-slate-700/50 rounded-xl transition-all duration-300 hover:scale-110"
                    aria-label={isMinimized ? 'Maximize chat' : 'Minimize chat'}
                >
                    {isMinimized ? <MaximizeIcon /> : <MinimizeIcon />}
                </button>
            </div>

            {!isMinimized && (
                <>
                    {/* Messages Area */}
                    <div className="relative z-10 overflow-y-auto p-4 flex-1 scrollbar-thin scrollbar-thumb-emerald-500/20 scrollbar-track-transparent">
                        <div className="flex flex-col gap-6">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex items-start gap-3 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                    {/* Avatar */}
                                    <div className="flex-shrink-0">
                                        {msg.sender === "user" ? <UserIcon /> : <BotIcon />}
                                    </div>
                                    
                                    {/* Message Container */}
                                    <div className={`flex flex-col max-w-[75%] ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                                        {/* Message Bubble */}
                                        <div className={`
                                            rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-lg backdrop-blur-sm
                                            ${msg.sender === "user" 
                                                ? "bg-gradient-to-br from-violet-500/80 to-purple-600/60 text-white border border-violet-400/30" 
                                                : "bg-gradient-to-br from-slate-800/80 to-slate-700/60 text-slate-200 border border-emerald-500/20"
                                            }
                                        `}>
                                            <div className="whitespace-pre-wrap">{msg.text}</div>
                                        </div>
                                        
                                        {/* Timestamp */}
                                        <span className="text-xs text-slate-500 mt-1 px-2">
                                            {msg.timestamp}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            
                            {/* Typing Indicator */}
                            {isLoading && (
                                <div className="flex items-start gap-3">
                                    <TypingIndicator />
                                </div>
                            )}
                            
                            <div ref={messagesEndRef} />
                        </div>
                    </div>
                    
                    {/* Input Area */}
                    <div className="relative z-10 p-4 border-t border-emerald-500/30 bg-slate-900/50 backdrop-blur-sm">
                        <div className="flex gap-3 items-end">
                            <div className="flex-1 relative">
                                <textarea
                                    ref={inputRef}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder={analysisData ? "Ask me anything about your resume or career..." : "Ask me any career-related question..."}
                                    className="w-full px-4 py-3 pr-12 bg-slate-800/60 border border-emerald-500/30 text-slate-200 rounded-2xl 
                                             focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-400/50 
                                             resize-none backdrop-blur-sm transition-all duration-300 placeholder-slate-500
                                             scrollbar-thin scrollbar-thumb-emerald-500/20 scrollbar-track-transparent"
                                    disabled={isLoading}
                                    rows="1"
                                    style={{ minHeight: '50px', maxHeight: '120px' }}
                                    onInput={(e) => {
                                        e.target.style.height = 'auto';
                                        e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                                    }}
                                />
                                
                                {/* Character count */}
                                {input.length > 100 && (
                                    <span className="absolute -bottom-5 right-2 text-xs text-slate-500">
                                        {input.length}/500
                                    </span>
                                )}
                            </div>
                            
                            <button
                                onClick={handleSend}
                                className="group bg-gradient-to-br from-emerald-500 to-blue-500 hover:from-emerald-400 hover:to-blue-400 
                                         text-white font-bold p-3 rounded-xl transition-all duration-300 disabled:opacity-50 
                                         disabled:cursor-not-allowed shadow-lg hover:shadow-emerald-500/30 hover:scale-105
                                         flex items-center justify-center min-w-[50px]"
                                disabled={isLoading || !input.trim()}
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <SendIcon />
                                )}
                            </button>
                        </div>
                        
                        {/* Quick Actions */}
                        {!isLoading && messages.length <= 1 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                {[
                                    "💼 Career advice",
                                    "📝 Resume tips", 
                                    "🎯 Job search help",
                                    "💡 Skill development"
                                ].map((suggestion, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setInput(suggestion.replace(/[^\w\s]/gi, '').trim())}
                                        className="text-xs px-3 py-1 bg-slate-700/50 hover:bg-slate-600/50 
                                                 text-slate-400 hover:text-slate-300 rounded-full border border-slate-600/30
                                                 hover:border-emerald-500/30 transition-all duration-300"
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default ChatBox;