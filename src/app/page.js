"use client";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const res = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    alert(await res.json().then(r => r.msg));
  };

  const handleLogin = async () => {
    const formData = new URLSearchParams();
    formData.append("username", email);
    formData.append("password", password);

    const res = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });

    const data = await res.json();
    localStorage.setItem("token", data.access_token);
    alert("Logged in!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Welcome to Mentora</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="border p-2 mb-2 rounded w-80"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="border p-2 mb-2 rounded w-80"
      />

      <div className="flex gap-4 mt-4">
        <button onClick={handleRegister} className="bg-blue-500 text-white px-4 py-2 rounded">
          Register
        </button>
        <button onClick={handleLogin} className="bg-green-500 text-white px-4 py-2 rounded">
          Login
        </button>
      </div>

      <button
        disabled
        className="mt-4 bg-gray-300 px-4 py-2 rounded cursor-not-allowed"
      >
        Sign in with Google (Coming Soon)
      </button>
    </div>
  );
}
