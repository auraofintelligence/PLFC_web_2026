
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../services/gemini';
import { ChatMessage } from '../types';

interface ExtendedChatMessage extends ChatMessage {
  grounding?: any[];
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<ExtendedChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await getGeminiResponse(userMsg, history);
    setHistory(prev => [...prev, { 
      role: 'model', 
      text: response.text,
      grounding: response.grounding
    }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl w-[90vw] sm:w-[420px] h-[600px] flex flex-col overflow-hidden animate-slide-up ring-1 ring-slate-950/10">
          <div className="bg-primary p-4 text-white flex justify-between items-center shadow-lg relative z-10">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <span className="material-symbols-outlined text-xl">smart_toy</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm">Fishing Assistant</span>
                <span className="text-[10px] opacity-80 uppercase tracking-widest font-bold">Powered by Gemini</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-lg transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-6 bg-slate-50/50 dark:bg-slate-900/50">
            {history.length === 0 && (
              <div className="text-center py-12 px-6 flex flex-col items-center">
                <div className="bg-primary/10 size-20 rounded-full flex items-center justify-center mb-4 animate-float">
                  <span className="material-symbols-outlined text-primary text-5xl">phishing</span>
                </div>
                <h3 className="font-bold text-slate-800 dark:text-white text-lg">G'day Mate!</h3>
                <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                  I'm your local Straddie expert. Ask me about snapper spots, bag limits, or safety at the South Passage Bar.
                </p>
                <div className="mt-8 grid grid-cols-1 gap-2 w-full">
                  {['What are the bream limits?', 'How safe is the bar today?', 'Best bait for flathead?'].map(q => (
                    <button 
                      key={q}
                      onClick={() => setInput(q)}
                      className="text-xs font-bold text-primary bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-3 rounded-xl hover:bg-primary hover:text-white transition-all text-left shadow-sm"
                    >
                      "{q}"
                    </button>
                  ))}
                </div>
              </div>
            )}
            {history.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-primary text-white rounded-br-none' 
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-100 dark:border-slate-700'
                }`}>
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                  
                  {msg.role === 'model' && msg.grounding && msg.grounding.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Sources:</p>
                      <div className="flex flex-wrap gap-2">
                        {msg.grounding.map((chunk, i) => (
                          chunk.web && (
                            <a 
                              key={i}
                              href={chunk.web.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-2 py-1 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
                            >
                              <span className="material-symbols-outlined text-xs">public</span>
                              <span className="truncate max-w-[120px]">{chunk.web.title || 'Source'}</span>
                            </a>
                          )
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1 font-bold uppercase tracking-tighter">
                  {msg.role === 'user' ? 'You' : 'Assistant'}
                </span>
              </div>
            ))}
            {isLoading && (
              <div className="flex flex-col items-start">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-bl-none flex gap-1.5 border border-slate-100 dark:border-slate-700 shadow-sm">
                  <div className="size-2 bg-primary/40 rounded-full animate-bounce"></div>
                  <div className="size-2 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="size-2 bg-primary/40 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex gap-3 relative z-10">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your fishing question..."
              className="flex-grow bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400 h-11"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="bg-primary text-white size-11 rounded-xl flex items-center justify-center hover:bg-primary-dark transition-all shadow-md shadow-primary/20 disabled:opacity-50 disabled:shadow-none"
            >
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary text-white size-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group ring-4 ring-white dark:ring-slate-800"
        >
          <span className="material-symbols-outlined text-4xl transition-transform group-hover:rotate-12">support_agent</span>
          <span className="absolute -top-1 -right-1 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-primary border-4 border-white dark:border-slate-800"></span>
          </span>
        </button>
      )}
    </div>
  );
};

export default ChatBot;
