"use client";

import React, { useState } from "react";

type Thread = {
  id: number;
  author: string;
  topic: string; // The main "Title"
  activeUsers: number;
  lastReply: string | null; // Show the last activity
};

const INITIAL_THREADS: Thread[] = [
  {
    id: 1,
    author: "alex_dev",
    topic: "Why is CSS grid so hard to center vertically compared to Flexbox?",
    activeUsers: 12,
    lastReply: "It's actually easier if you use place-items: center",
  },
  {
    id: 2,
    author: "sarah_p",
    topic: "Best VS Code extensions for 2024?",
    activeUsers: 8,
    lastReply: null, // New topic
  },
  {
    id: 3,
    author: "sys_admin",
    topic: "Server currently experiencing high latency in US-East.",
    activeUsers: 45,
    lastReply: "Is this affecting the database writes too?",
  },
];

export default function Home() {
  const [threads, setThreads] = useState<Thread[]>(INITIAL_THREADS);
  const [inputs, setInputs] = useState<{ [key: number]: string }>({});

  // Handle typing in specific thread input
  const handleInputChange = (id: number, value: string) => {
    setInputs((prev) => ({ ...prev, [id]: value }));
  };

  // Mock sending a message
  const handleSend = (id: number) => {
    if (!inputs[id]) return;
    console.log(`Sent to thread ${id}: ${inputs[id]}`);
    setInputs((prev) => ({ ...prev, [id]: "" })); // Clear input
    // In a real app, you'd push this to the backend here
  };

  return (
    <main className="relative min-h-screen w-full bg-black text-white overflow-x-hidden selection:bg-purple-500 selection:text-white">
      {/* --- BACKGROUND (Noise + Purple Orbs) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-900/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px]" />
      </div>
      <div className="fixed inset-0 z-10 opacity-20 pointer-events-none mix-blend-overlay">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* --- CHAT DASHBOARD LAYER --- */}
      <div className="relative z-20 flex flex-col items-center w-full min-h-screen py-10 px-4">
        {/* Header */}
        <div className="w-full max-w-3xl mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Active Rooms</h1>
          <button className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-[0_0_20px_rgba(147,51,234,0.3)]">
            + New Topic
          </button>
        </div>

        {/* The Grid of "Active Chat Rooms" */}
        <div className="w-full max-w-3xl flex flex-col gap-4">
          {threads.map((thread) => (
            <div
              key={thread.id}
              className="group relative w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden transition-all hover:border-purple-500/30"
            >
              {/* Top Bar: Topic & Info */}
              <div className="p-5 pb-3">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg md:text-xl font-semibold text-white leading-snug pr-4">
                    {thread.topic}
                  </h3>
                  <span className="flex items-center gap-1.5 text-xs font-mono text-purple-300 bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20 shrink-0">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                    </span>
                    {thread.activeUsers} online
                  </span>
                </div>

                {/* Author attribution */}
                <p className="text-xs text-neutral-500 mb-4">
                  Started by{" "}
                  <span className="text-neutral-400">@{thread.author}</span>
                </p>

                {/* The "Preview" of the chat (The latest reply) */}
                {thread.lastReply && (
                  <div className="mb-4 pl-3 border-l-2 border-white/10 text-sm text-neutral-300 italic">
                    "{thread.lastReply}"
                  </div>
                )}
              </div>

              {/* ACTION AREA: The Quick Reply Box */}
              {/* This is visually separated by a slightly darker background */}
              <div className="bg-black/20 p-3 border-t border-white/5 flex items-center gap-3">
                {/* Input Field */}
                <input
                  type="text"
                  value={inputs[thread.id] || ""}
                  onChange={(e) => handleInputChange(thread.id, e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend(thread.id)}
                  placeholder={`Reply to ${thread.author}...`}
                  className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder:text-neutral-600 h-full py-2"
                />

                {/* Send Button (Only highlights when you type) */}
                <button
                  onClick={() => handleSend(thread.id)}
                  disabled={!inputs[thread.id]}
                  className={`p-2 rounded-lg transition-all ${
                    inputs[thread.id]
                      ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.5)]"
                      : "bg-white/5 text-neutral-600 cursor-not-allowed"
                  }`}
                >
                  <SendIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

// --- Icons ---
function SendIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="22" y1="2" x2="11" y2="13"></line>
      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
  );
}
