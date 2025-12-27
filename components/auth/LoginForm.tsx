"use client";

export default function LoginPage() {
  return (
    <form className="space-y-5">
      <div>
        <label className="block text-sm text-white/70 mb-1">Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm text-white/70 mb-1">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-purple-600 hover:bg-purple-700 transition py-3 font-medium text-white shadow-lg shadow-purple-600/30"
      >
        Login
      </button>
    </form>
  );
}
