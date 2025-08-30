'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from './utils/auth';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/chat');
    } else {
      router.push('/login');
    }
  }, [router]);

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