'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const formData = new URLSearchParams()
      formData.append('email', email)
      formData.append('password', password)

      const res = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        alert('Login failed')
        return
      }

      const data = await res.json()
      // Save token in localStorage
      localStorage.setItem('access_token', data.access_token)

      // Redirect to chat page
      router.push('/chat')
    } catch (err) {
      console.error(err)
      alert('Something went wrong')
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-96 p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold text-center">Login to Mentora</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Login
        </button>
        <button
          type="button"
          className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
          onClick={() => alert('Coming soon!')}
        >
          Sign in with Google
        </button>
      </form>
    </div>
  )
}
