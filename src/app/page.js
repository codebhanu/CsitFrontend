'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { isAuthenticated } from './utils/auth';
import '../app/landing.css'

export default function Home() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status but always show landing page
    const authStatus = isAuthenticated();
    setIsAuth(authStatus);
    setIsLoading(false);
  }, []);

  const handleChatNow = () => {
    if (isAuth) {
      router.push('/chat');
    } else {
      router.push('/login');
    }
  };

  if (isLoading) {
    return (
      <div className="auth-container">
        <div className="auth-form">
          <h1>Mentora</h1>
          <p style={{ textAlign: 'center', color: '#666' }}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <span className="logo-icon">🌱</span>
          <span className="logo-text">mentora</span>
        </div>
        <div className="auth-buttons">
          {isAuth ? (
            <button 
              className="btn-secondary"
              onClick={() => router.push('/chat')}
            >
              Dashboard
            </button>
          ) : (
            <>
              <Link href="/register" className="btn-secondary">
                Sign Up
              </Link>
              <Link href="/login" className="btn-primary">
                Login
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-image">
            <div className="meditation-silhouette">
              🧘‍♀️
            </div>
          </div>
          <div className="hero-text">
            <h1>Welcome to Mentora -</h1>
            <h2>Your Mental Health Companion</h2>
            <p>Chat with Mentora to conveniently get emotional support anytime, anywhere.</p>
            <button className="btn-chat-now" onClick={handleChatNow}>
              Chat Now
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h3>Our features</h3>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">💬</span>
            <span>24/7 Emotional Support</span>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📊</span>
            <span>Get support based on your data</span>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🔒</span>
            <span>Confidential & Private</span>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🤝</span>
            <span>Friendly & Non-judgmental</span>
          </div>
          <div className="feature-card wide">
            <span className="feature-icon">👤</span>
            <span>Both Anonymous & Login mode</span>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h3>Anonymous User Feedback</h3>
        <div className="testimonials-grid">
          <div className="testimonial">
            <div className="testimonial-date">January 2025</div>
            <p>"Mentora has been a game changer for my anxiety. 24/7 instant support available to understand how to deal with life responsiveness. Really support me when I need it the most!"</p>
            <div className="testimonial-author">
              <span className="avatar">👤</span>
              <span>Anonymous User</span>
            </div>
          </div>
          <div className="testimonial">
            <div className="testimonial-date">January 2025</div>
            <p>"I love this app! I find it incredibly calming and helpful when I'm feeling overwhelmed. Whether I'm dealing with stress, my anxiety, it brings me so much ease before bed!"</p>
            <div className="testimonial-author">
              <span className="avatar">👤</span>
              <span>Anonymous User</span>
            </div>
          </div>
          <div className="testimonial">
            <div className="testimonial-date">January 2025</div>
            <p>"This app has been so supportive and caring at my times when I'm struggling. It really helped me understand my emotions and work through difficult moments."</p>
            <div className="testimonial-author">
              <span className="avatar">👤</span>
              <span>Anonymous User</span>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <h3>Ready to chat with us?</h3>
        <p>We're here for you!</p>
        <button className="btn-cta" onClick={handleChatNow}>
          Start Chatting Now
        </button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-links">
          <Link href="#privacy">Privacy Policy</Link>
          <Link href="#terms">Terms & Conditions</Link>
        </div>
        <p className="footer-disclaimer">
          Mentora is not a therapist, psychologist, psychiatrist, or medical professional, and does not provide professional 
          mental health services or therapy. If you are in crisis or needing professional help, please speak to a mental health professional 
          or go to your nearest emergency room. For emergencies only, text or call the suicide prevention hotline at 988. 
          Mentora provides general information and support but cannot provide medical health services.
        </p>
      </footer>
    </div>
  );
}