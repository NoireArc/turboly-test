"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { register } from "@/services/auth.services";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      setLoading(true);

      setError("");

      await register(email, password);

      router.push("/");
    } catch (error) {
      setError("Failed to register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">Create Account</h1>

          <p className="text-zinc-400 mt-2">Register to continue</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-zinc-400 block mb-2">Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 text-white outline-none focus:border-white transition"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-400 block mb-2">Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 text-white outline-none focus:border-white transition"
            />
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-2xl text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-white text-black py-3 rounded-2xl font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link href="/" className="text-white font-medium">
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}
