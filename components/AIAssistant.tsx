import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  text: string;
}

const SYSTEM_INSTRUCTION = `You are the personal AI Assistant for Runhussain Pasha Shaik, a professional Full Stack Engineer.
Your goal is to represent him to recruiters and potential collaborators. 

Runhussain's Profile Summary:
- Role: Full Stack Developer / Software Engineer specializing in PHP, Laravel, and Modern Web Tech.
- Current Status: Web Developer (Full-time) at Aeologic Technologies (since July 2025).
- Education: B.Tech in Computer Science Engineering from Raghu Engineering College (2021-2025).
- Core Skills: PHP, Laravel, MySQL, JavaScript, React, Tailwind CSS, Bootstrap 5, Git, WordPress.
- Key Projects: 
  1. Event Management System (Full Stack PHP/Laravel) with role-based access and real-time tracking.
  2. Digital Portfolio V2 (React/TypeScript/Framer Motion).
  3. Aeologic Company Website (Laravel-based corporate platform).
  4. Track and Trace Website (Logistics monitoring system powered by Laravel).
- Contact Info: Visakhapatnam, Andhra Pradesh. Phone: +91 9848595811. Email: skrhp01@gmail.com.
- Professional Traits: Problem-solver, motivated, eager to build scalable applications.

Rules for Interaction:
- Be professional, friendly, and concise.
- Refer to Runhussain in the third person.
- If asked about something not in this context, politely mention you're focused on his professional portfolio but can share his contact details.
- Use simple formatting like bullet points if listing skills or projects.`;

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hi! I'm Runhussain's AI representative. Ask me anything about his projects, skills, or experience!" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });

      // Filter history to fit message format
      // Note: chat.sendMessage takes a simple message string
      const response = await chat.sendMessage({ message: userMessage });
      const botResponse = response.text || "I'm sorry, I couldn't process that right now.";
      
      setMessages(prev => [...prev, { role: 'model', text: botResponse }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting right now. Please try again or contact Runhussain directly!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-tr from-primary via-secondary to-accent rounded-full shadow-2xl flex items-center justify-center text-white z-[60] group overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <MessageSquare size={24} className="relative z-10" />
        <Sparkles size={14} className="absolute top-2 right-2 text-white animate-pulse" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 100 }}
            className="fixed bottom-24 right-6 w-[350px] sm:w-[400px] h-[500px] bg-slate-900/90 backdrop-blur-2xl border border-slate-800 rounded-2xl shadow-2xl flex flex-col z-[70] overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-800 bg-gradient-to-r from-primary/10 to-accent/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-primary/30">
                  <Bot size={22} className="text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-wide">Career Assistant</h4>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[10px] text-slate-400 font-medium">Powered by Gemini AI</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Body */}
            <div 
              ref={chatRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar"
            >
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center border ${
                      msg.role === 'user' 
                        ? 'bg-slate-800 border-slate-700' 
                        : 'bg-primary/10 border-primary/20'
                    }`}>
                      {msg.role === 'user' ? <User size={14} className="text-slate-400" /> : <Bot size={14} className="text-primary" />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-primary text-white rounded-tr-none shadow-lg' 
                        : 'bg-slate-800/80 text-slate-200 rounded-tl-none border border-slate-700/50'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-2 items-center bg-slate-800/80 p-3 rounded-2xl rounded-tl-none border border-slate-700/50">
                    <Loader2 size={16} className="text-primary animate-spin" />
                    <span className="text-xs text-slate-400 font-medium italic">Thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Input */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/50">
              <div className="flex gap-2">
                <input 
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me something..."
                  className="flex-1 bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-slate-600"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={isTyping}
                  className="p-2.5 bg-primary rounded-xl text-white shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                </motion.button>
              </div>
              <p className="text-[9px] text-slate-500 text-center mt-3 font-medium uppercase tracking-tighter opacity-50">
                Representative AI version of Runhussain
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;