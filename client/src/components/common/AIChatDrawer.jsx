import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, X, Bot, User, RefreshCw } from 'lucide-react';
import api from '../../lib/api';

export function AIChatDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hello! I'm your AI Sous Chef. Ask me anything about your fridge ingredients, recipes, or meal ideas!" }
  ]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.post('/ai/chat', { message: userMsg });
      if (res.success && res.data) {
        setMessages((prev) => [...prev, { sender: 'ai', text: res.data.reply }]);
      }
    } catch (err) {
      setMessages((prev) => [...prev, { sender: 'ai', text: "I'm having a brief issue connecting to my culinary database. Please try again!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 bg-[#2F7D4A] hover:bg-[#205C36] text-white font-bold text-sm rounded-full shadow-glow transition-all hover:scale-105"
      >
        <Sparkles className="w-5 h-5 text-[#F3B562]" />
        <span>Ask AI Sous Chef</span>
      </button>

      {/* Slide-over Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-stone-900/40 backdrop-blur-xs"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute inset-y-0 right-0 max-w-full flex pl-10"
            >
              <div className="w-screen max-w-md bg-white dark:bg-[#172019] shadow-2xl border-l border-stone-200 dark:border-stone-800 flex flex-col">
                {/* Header */}
                <div className="p-4 bg-[#2F7D4A] text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white/10">
                      <Sparkles className="w-5 h-5 text-[#F3B562]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base">AI Sous Chef Assistant</h3>
                      <p className="text-xs text-emerald-100">Always learning your taste preferences</p>
                    </div>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-lg text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Messages Body */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FAFAF5] dark:bg-[#0F1411]">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.sender === 'ai' && (
                        <div className="w-8 h-8 rounded-full bg-[#2F7D4A] text-white flex items-center justify-center shrink-0">
                          <Bot className="w-4 h-4" />
                        </div>
                      )}
                      <div
                        className={`p-3.5 rounded-2xl max-w-[80%] text-sm shadow-xs ${
                          msg.sender === 'user'
                            ? 'bg-[#2F7D4A] text-white rounded-br-none'
                            : 'bg-white dark:bg-[#172019] text-[#172019] dark:text-stone-100 border border-stone-200 dark:border-stone-800 rounded-bl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                      {msg.sender === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-stone-300 dark:bg-stone-700 text-stone-700 dark:text-stone-200 flex items-center justify-center shrink-0">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  ))}
                  {loading && (
                    <div className="flex items-center gap-2 text-stone-400 text-xs italic p-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-[#2F7D4A]" />
                      <span>Sous Chef is thinking...</span>
                    </div>
                  )}
                </div>

                {/* Input Controls */}
                <form onSubmit={handleSend} className="p-3 bg-white dark:bg-[#172019] border-t border-stone-200 dark:border-stone-800 flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask what to cook, subs, or tips..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-stone-100 dark:bg-stone-800 text-[#172019] dark:text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2F7D4A]"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || loading}
                    className="px-4 py-2.5 bg-[#2F7D4A] hover:bg-[#205C36] text-white rounded-xl font-bold text-sm transition-colors disabled:opacity-50 flex items-center justify-center"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
