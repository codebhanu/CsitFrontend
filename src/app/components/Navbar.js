'use client';

import { useRouter } from 'next/navigation';
import { removeToken } from '../utils/auth';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    router.push('/login');
  };

  return (
    <nav className="navbar">
      <h1>Mentora</h1>
      <button onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}