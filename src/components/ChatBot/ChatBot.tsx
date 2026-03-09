import React, { useState, useRef, useEffect } from 'react';
import { IoChatbubblesSharp, IoClose, IoSend } from 'react-icons/io5';
import './ChatBot.css';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState<Message[]>([
    { role: 'assistant', text: 'Hello! I am XploitSim AI. How can I help you with cybersecurity today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage('');
    setHistory(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chatbot/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage,
          history: history.map(msg => ({ role: msg.role, text: msg.text }))
        }),
      });

      const data = await response.json();
      if (data.text) {
        setHistory(prev => [...prev, { role: 'assistant', text: data.text }]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Chat Error:', error);
      setHistory(prev => [...prev, { role: 'assistant', text: 'Sorry, I encountered an error. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
      <div className="chatbot-window">
        <div className="chatbot-header">
          <div className="header-info">
            <span className="bot-status"></span>
            <h3>XploitSim AI</h3>
          </div>
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            <IoClose size={24} />
          </button>
        </div>
        
        <div className="chatbot-messages">
          {history.map((msg, index) => (
            <div key={index} className={`message-bubble ${msg.role}`}>
              <div className="message-content">{msg.text}</div>
            </div>
          ))}
          {isLoading && (
            <div className="message-bubble assistant loading">
              <div className="typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="chatbot-input" onSubmit={handleSubmit}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about exploits..."
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !message.trim()}>
            <IoSend size={20} />
          </button>
        </form>
      </div>

      <button 
        className="chatbot-toggle" 
        onClick={() => setIsOpen(!isOpen)}
        title="Chat with AI"
      >
        {isOpen ? <IoClose size={28} /> : <IoChatbubblesSharp size={28} />}
      </button>
    </div>
  );
};

export default ChatBot;
