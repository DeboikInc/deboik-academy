"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IoLockClosed, IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export default function AdminLogin() {
  const router       = useRouter();
  const params       = useSearchParams();
  const from         = params.get("from") ?? "/admin/cohorts";

  const [password, setPassword] = useState("");
  const [show, setShow]         = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();
    if (data.success) {
      router.replace(from);
    } else {
      setError("Incorrect password");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-academy-dark flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-academy-yellow/15 border border-academy-yellow/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <IoLockClosed className="text-academy-yellow text-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Access</h1>
          <p className="text-gray-500 text-sm mt-1">Deboik Academy — Management</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className={`w-full bg-academy-deep/60 border ${error ? "border-red-500" : "border-academy-primary/30"} rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-academy-yellow transition-colors pr-12`}
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
            >
              {show ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </button>
          </div>
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full py-3 disabled:opacity-50">
            {loading ? "Verifying…" : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}