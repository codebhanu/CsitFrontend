'use client';

import { useState, useEffect } from 'react';
import api from '../utils/api';

export default function ChatHistory() {
  const [history, setHistory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get('/history');
        setHistory(response.data.history);
      } catch (error) {
        console.error('Failed to fetch history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const parseHistory = (historyString) => {
    if (!historyString) return [];
    
    // Split by the pattern that separates conversations
    const conversations = historyString.split('\n\n').filter(conv => conv.trim());
    
    return conversations.slice(0, 5).map((conv, index) => {
      const lines = conv.split('\n');
      const userLine = lines.find(line => line.startsWith('User:'));
      const assistantLine = lines.find(line => line.startsWith('Assistant:'));
      
      return {
        id: index,
        user: userLine ? userLine.replace('User: ', '').trim() : '',
        assistant: assistantLine ? assistantLine.replace('Assistant: ', '').trim() : ''
      };
    });
  };

  const conversations = parseHistory(history);

  if (loading) {
    return (
      <div className="chat-history">
        <h2>Chat History</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="chat-history">
      <h2>Recent Conversations</h2>
      {conversations.length === 0 ? (
        <p style={{ color: '#666', fontStyle: 'italic' }}>
          No conversations yet. Start chatting!
        </p>
      ) : (
        conversations.map((conv) => (
          <div key={conv.id} className="history-item">
            <strong>You:</strong>
            <span>{conv.user.substring(0, 50)}{conv.user.length > 50 ? '...' : ''}</span>
          </div>
        ))
      )}
    </div>
  );
}