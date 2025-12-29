import ThreadButton from "@/components/threadComponents/ThreadButton";
import ThreadCard from "../../components/threadComponents/ThreadCard";

// This data will eventually come from Prisma/DB
const INITIAL_THREADS = [
  {
    id: 1,
    author: "alex_dev",
    topic:
      "Just got the new mechanical keyboard. The sound profile is deep thock, not clack. ⌨️",
    image:
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80",
  },
  {
    id: 2,
    author: "sarah_p",
    topic:
      "Does anyone else think the contrast on the new Tailwind slate colors is a bit low?",
  },
  {
    id: 3,
    author: "sys_admin",
    topic: "It's all dying, there is no time, plant one today",
    image:
      "https://images.unsplash.com/photo-1766903993146-1faf27604097?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-black text-white overflow-x-hidden selection:bg-purple-500 selection:text-white">
      {/* --- STATIC BACKGROUNDS (Server Rendered) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/55 via-black to-black" />
        <div className="absolute inset-0 bg-gradient-to-bl from-purple-900/40 via-transparent to-transparent" />
      </div>
      <div className="fixed inset-0 z-10 opacity-20 pointer-events-none mix-blend-overlay">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* --- FEED --- */}
      <div className="relative z-20 flex flex-col items-center w-full min-h-screen py-8 px-4">
        {/* Header */}
        <div className="w-full max-w-3xl mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Topics</h1>
          <ThreadButton />
        </div>

        {/* List of Threads */}
        <div className="w-full max-w-3xl flex flex-col gap-4">
          {INITIAL_THREADS.map((thread) => (
            // We pass the data DOWN to the Client Component
            <ThreadCard key={thread.id} thread={thread} />
          ))}
        </div>
      </div>
    </main>
  );
}
