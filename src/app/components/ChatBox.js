'use client';

import { useState, useRef, useEffect } from 'react';
import api from '../utils/api';

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const addBotMessage = (text) => {
  let index = 0;
  const interval = setInterval(() => {
    if (index < text.length) {
      // Update the last bot message or add a new one
      setMessages(prev => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage?.type === 'bot' && lastMessage.temp) {
          const updated = [...prev];
          updated[updated.length - 1] = { ...lastMessage, content: text.slice(0, index + 1) };
          return updated;
        }
        return [...prev, { type: 'bot', content: text.slice(0, index + 1), temp: true }];
      });
      index++;
    } else {
      // remove temp flag
      setMessages(prev => prev.map(m => ({ ...m, temp: false })));
      clearInterval(interval);
    }
  }, 20); // 20ms per character
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || loading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setLoading(true);

    // Add user message to chat
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);

    try {
      const response = await api.post('/chat', {
        query: userMessage
      });

      // Add bot response to chat
      const botResponse = response.data.response?.trim() || "I'm not sure how to respond to that yet.";
        addBotMessage(botResponse);

    } catch (error) {
      console.error('Chat error:', error);
      let errorMessage = 'Sorry, I encountered an error. Please try again.';
      
      if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      } else if (error.response?.status === 500) {
        errorMessage = 'Server error. Please check if the backend is running properly.';
      }
      
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: errorMessage 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-box">
      <div className="messages">
        {messages.length === 0 && (
          <div className="message bot">
            <p>Hello! I'm Mentora, your mental health companion. How are you feeling today?</p>
          </div>
        )}
        
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            <p>{message.content}</p>
          </div>
        ))}
        
        {loading && (
          <div className="message bot">
            <p>Thinking...</p>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <form className="input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message here..."
          disabled={loading}
        />
        <button type="submit" disabled={loading || !inputValue.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}