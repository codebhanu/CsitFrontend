'use client'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <div className="text-xl font-bold">Mentora</div>
      <div className="flex gap-4">
        <Link href="/login" className="hover:underline">Login</Link>
        <Link href="/register" className="hover:underline">Register</Link>
      </div>
    </nav>
  )
}
