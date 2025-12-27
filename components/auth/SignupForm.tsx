"use client";

import { signup } from "../../app/signup/actions";
import { useActionState, useState } from "react";

const initialState = { error: "" };
export default function SignupPage() {
  const [password, setPassword] = useState("");
  const [passErrors, setPassError] = useState("");
  const [state, formAction] = useActionState(signup, initialState);

  async function handlePassword(value: string) {
    setPassword(value);
    passwordValid(value);
  }

  function passwordValid(value: string) {
    const passwordRegex = /^(?!\s*$).+/;
    if (!passwordRegex.test(value)) {
      setPassError("Password is required.");
    } else {
      if (!/[A-Z]/.test(value)) {
        setPassError("Password must contain at least one uppercase letter.");
        return;
      }
      if (!/[a-z]/.test(value)) {
        setPassError("Password must contain at least one lowercase letter.");
        return;
      }
      if (!/\d/.test(value)) {
        setPassError("Password must contain at least one digit.");
        return;
      }
      if (!/[@$#!%*?&]/.test(value)) {
        setPassError(
          "Password must contain at least one special character (@$!%*?&).",
        );
        return;
      }
      if (value.length < 6) {
        setPassError("Password must contain at least 6 characters");
        return;
      }
    }
    setPassError("");
    return;
  }

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label className="block text-sm text-white/70 mb-1">Username</label>
        <input
          type="text"
          name="username"
          placeholder="yourname"
          className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm text-white/70 mb-1">Email</label>
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm text-white/70 mb-1">Password</label>
        <input
          type="password"
          name="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => handlePassword(e.target.value)}
          className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {passErrors ? (
          <p className="text-red-500 pt-1 text-sm">{passErrors}</p>
        ) : null}

        {state.error ? (
          <p className="text-red-500 pt-1 text-sm">{state.error}</p>
        ) : null}
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-purple-600 hover:bg-purple-700 transition py-3 font-medium text-white shadow-lg shadow-purple-600/30"
      >
        Sign up
      </button>
    </form>
  );
}
