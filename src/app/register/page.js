'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const router = useRouter()

  const handleRegister = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    try {
      const formData = new URLSearchParams()
      formData.append('email', email)
      formData.append('password', password)

      const res = await fetch('http://127.0.0.1:8000/register', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        alert('Registration failed')
        return
      }

      alert('Registration successful! Please login.')
      router.push('/login')
    } catch (err) {
      console.error(err)
      alert('Something went wrong')
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <form onSubmit={handleRegister} className="flex flex-col gap-4 w-96 p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold text-center">Register for Mentora</h1>
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Register
        </button>
      </form>
    </div>
  )
}
