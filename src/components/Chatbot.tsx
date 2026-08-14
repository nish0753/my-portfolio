import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Volume2, VolumeX, Sparkles, MessageSquare, Mic } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';
import { useProjects } from '@/hooks/useProjects';
import { useExperience } from '@/hooks/useExperience';
import { useEducation } from '@/hooks/useEducation';
import { useTheme } from '@/hooks/useTheme';
import { askGroqRAG } from '@/services/groqRagService';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false); // Audio OFF by default
  const { theme } = useTheme();
  const { profile } = useProfile();
  const { projects } = useProjects();
  const { items: experience } = useExperience();
  const { items: education } = useEducation();

  const firstName = profile.name ? profile.name.split(' ')[0] : 'Nishant';
  const assistantName = `${firstName}'s AI Assistant`;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Hello! 👋 I'm **${firstName}'s AI assistant**. Ask me anything about **skills**, **projects**, **work experience**, or **academics**!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Text-to-speech audio synthesis (only if user explicitly clicks Audio on)
  const speakText = (text: string) => {
    if (!audioEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/\*\*/g, '').replace(/[\#\_\`]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  };

  // Format Markdown bold text using active theme accent color
  const renderFormattedText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <span key={idx} style={{ color: 'var(--accent)', fontWeight: 600 }}>
            {part.slice(2, -2)}
          </span>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    try {
      const response = await askGroqRAG(text, {
        profile,
        projects,
        experience,
        education,
      });

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
      speakText(response);
    } catch (err) {
      console.error('RAG Error:', err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans" data-theme={theme}>
      {/* Floating Trigger Button matching site theme */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="btn-primary rounded-full px-5 py-3.5 shadow-2xl flex items-center gap-3 cursor-pointer transition-transform hover:scale-105"
          style={{
            background: 'var(--accent)',
            color: 'var(--bg)',
            boxShadow: '0 10px 30px rgba(var(--accent-rgb), 0.4)',
          }}
          aria-label="Open AI Assistant"
        >
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider">Ask AI</span>
        </button>
      )}

      {/* Floating Chat Modal matching site theme */}
      {isOpen && (
        <div
          className="w-[94vw] sm:w-[385px] h-[520px] rounded-2xl border shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
          style={{
            background: 'var(--bg-elev)',
            borderColor: 'var(--border-strong)',
            color: 'var(--fg)',
            boxShadow: '0 25px 70px -15px rgba(0, 0, 0, 0.65)',
          }}
        >
          {/* Header */}
          <div
            className="px-5 py-4 border-b flex items-center justify-between"
            style={{ background: 'var(--bg-elev-2)', borderColor: 'var(--border)' }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs shadow-md"
                style={{ background: 'var(--accent)', color: 'var(--bg)' }}
              >
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="font-mono text-xs font-bold flex items-center gap-2" style={{ color: 'var(--fg)' }}>
                  <span>{assistantName}</span>
                  <span className="w-2 h-2 rounded-full" style={{ background: 'var(--accent-2)' }}></span>
                </div>
                <div className="font-mono text-[10px]" style={{ color: 'var(--muted)' }}>
                  {audioEnabled ? '● Online • Voice on' : '● Online • Groq LLM'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setAudioEnabled(!audioEnabled)}
                className="px-2.5 py-1 rounded-full text-[10px] font-mono flex items-center gap-1.5 border transition-all cursor-pointer"
                style={{
                  borderColor: 'var(--border)',
                  background: audioEnabled ? 'var(--accent)' : 'var(--bg)',
                  color: audioEnabled ? 'var(--bg)' : 'var(--muted)',
                }}
                title={audioEnabled ? 'Voice active (click to mute)' : 'Click to enable voice'}
              >
                {audioEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
                <span>{audioEnabled ? 'Audio on' : 'Audio off'}</span>
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded hover:opacity-80 transition-opacity cursor-pointer"
                style={{ color: 'var(--muted)' }}
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[84%] px-3.5 py-2.5 rounded-2xl whitespace-pre-line leading-relaxed border ${
                    msg.sender === 'user' ? 'rounded-br-none font-medium' : 'rounded-bl-none'
                  }`}
                  style={{
                    background: msg.sender === 'user' ? 'var(--accent)' : 'var(--bg-elev-2)',
                    color: msg.sender === 'user' ? 'var(--bg)' : 'var(--fg)',
                    borderColor: msg.sender === 'user' ? 'transparent' : 'var(--border)',
                  }}
                >
                  {renderFormattedText(msg.text)}
                  <div className="text-[9px] mt-1 font-mono text-right opacity-60">
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div
                  className="px-3.5 py-2 rounded-2xl font-mono text-[11px] border flex items-center gap-2"
                  style={{ background: 'var(--bg-elev-2)', color: 'var(--muted)', borderColor: 'var(--border)' }}
                >
                  <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ color: 'var(--accent)' }} />
                  <span>Thinking with Groq LLM...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t flex items-center gap-2"
            style={{ background: 'var(--bg-elev-2)', borderColor: 'var(--border)' }}
          >
            <div className="relative flex-1 flex items-center">
              <Mic className="absolute left-3 w-3.5 h-3.5 pointer-events-none" style={{ color: 'var(--muted)' }} />
              <input
                type="text"
                placeholder={`Ask about ${firstName}...`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-transparent pl-8 pr-3 py-2 text-xs outline-none font-mono"
                style={{ color: 'var(--fg)' }}
              />
            </div>
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2 rounded-lg transition-opacity disabled:opacity-30 cursor-pointer"
              style={{ background: 'var(--accent)', color: 'var(--bg)' }}
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
