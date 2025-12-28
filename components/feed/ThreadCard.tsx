"use client";

import { useState } from "react";

type Thread = {
  id: number;
  author: string;
  topic: string;
  image?: string;
  initialLikes?: number;
  initialComments?: number;
};

export default function ThreadCard({ thread }: { thread: Thread }) {
  const [input, setInput] = useState("");
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(thread.initialLikes || 0);
  // icon shrinks after thousand
  const [commentCount] = useState(thread.initialComments || 0);

  const handleSend = () => {
    if (!input) return;
    console.log(`Sent to thread ${thread.id}: ${input}`);
    setInput("");
  };

  const toggleLike = () => {
    if (liked) {
      setLikeCount((prev) => prev - 1);
      setLiked(false);
    } else {
      setLikeCount((prev) => prev + 1);
      setLiked(true);
    }
  };

  return (
    <div className="group relative w-full rounded-2xl border border-white/25 bg-white/5 backdrop-blur-lg overflow-hidden transition-all hover:border-purple-500/40">
      {/* --- MAIN PADDING CONTAINER --- */}
      <div className="p-5 pb-3">
        {/* ROW 1: HEADER */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg text-white font-medium">
            @{thread.author}
          </span>
          <button className="text-neutral-500 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors -mr-2 -mt-2">
            <MoreVerticalIcon className="w-5 h-5" />
          </button>
        </div>

        {/* ROW 2: CONTENT */}
        <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg md:text-xl font-semibold text-white leading-snug">
              {thread.topic}
            </h3>
          </div>

          {thread.image && (
            <div className="shrink-0 w-full md:w-32">
              <img
                src={thread.image}
                alt="Topic attachment"
                className="w-full h-48 md:h-32 rounded-xl object-cover border border-white/10 bg-white/5"
              />
            </div>
          )}
        </div>
      </div>

      {/* --- INTERACTIVE FOOTER --- */}

      <div className="bg-black/20 px-4 py-2 flex items-center gap-2 border-t border-white/5">
        {/* LIKE BUTTON */}
        <button
          onClick={toggleLike}
          className="group/like flex items-center justify-start w-16 gap-1.5 transition-colors shrink-0 p-2 rounded-lg hover:bg-white/5"
        >
          <HeartIcon
            filled={liked}
            className={`w-4 h-4 transition-transform duration-300 ${liked ? "scale-110 text-pink-500" : "text-white/60 group-hover/like:text-pink-400"}`}
          />
          <span
            className={`text-xs font-medium ${liked ? "text-pink-400" : "text-neutral-400 group-hover/like:text-neutral-200"}`}
          >
            {likeCount || "Like"}
          </span>
        </button>

        {/* COMMENT BUTTON - Triggers Expand */}
        <button className="group/comment flex items-center justify-start w-16 gap-1.5 transition-colors shrink-0 p-2 rounded-lg hover:bg-white/5">
          <MessageIcon className="w-5 h-5 text-white/60 group-hover/comment:text-purple-400" />
          <span className="text-xs font-medium text-neutral-400 group-hover/comment:text-neutral-200">
            {commentCount || "Reply"}
          </span>
        </button>
      </div>
    </div>
  );
}

// --- ICONS ---

function MessageIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      // CHANGED: Zoom in by cropping the canvas from 24 to 20
      viewBox="2 2 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function HeartIcon({
  className,
  filled,
}: {
  className?: string;
  filled: boolean;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function MoreVerticalIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  );
}
