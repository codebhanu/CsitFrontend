'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '../utils/auth';
import Navbar from '../components/Navbar';
import ChatBox from '../components/ChatBox';
import ChatHistory from '../components/ChatHistory';

export default function ChatPage() {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);

  if (!isAuthenticated()) {
    return (
      <div className="auth-container">
        <div className="auth-form">
          <p style={{ textAlign: 'center' }}>Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <Navbar />
      <main className="chat-main">
        <ChatHistory />
        <ChatBox />
      </main>
    </div>
  );
}