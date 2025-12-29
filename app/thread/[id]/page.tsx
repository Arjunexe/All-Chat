import Link from "next/link";
import { notFound } from "next/navigation";

// Mock Data (Eventually this comes from DB based on ID)
// We add "comments" array here to simulate the detail view

type ThreadData = {
  id: number;
  author: string;
  topic: string;
  content?: string;
  image?: string; // 👈 The '?' makes it optional (no error if missing)
  initialLikes?: number; // 👈 Optional
  comments: { id: number; user: string; text: string }[];
};

const MOCK_DB: Record<string, ThreadData> = {
  "1": {
    id: 1,
    author: "alex_dev",
    topic:
      "Just got the new mechanical keyboard. The sound profile is deep thock, not clack. ⌨️",
    image:
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80",

    content:
      "Lorem Ipsum is placeholder text commonly used in design and typesetting to fill space without distracting from layout elements. Lorem 200 typically requests about 200 words of this dummy textLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciuntNeque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",

    initialLikes: 120,
    comments: [
      { id: 1, user: "keeb_fan", text: "Which switches did you go with?" },
      {
        id: 2,
        user: "clicky_boi",
        text: "I prefer blue switches, sorry not sorry.",
      },
    ],
  },
  "2": {
    id: 2,
    author: "sarah_p",
    topic:
      "Does anyone else think the contrast on the new Tailwind slate colors is a bit low?",
    comments: [],
  },
};

interface PageProps {
  params: {
    id: string;
  };
}

// In Next.js 15, params is a Promise, but in 14 it's an object.
// Assuming Next.js 14 for simplicity, but if you get an error, add 'await'
export default async function ThreadDetailPage({ params }: PageProps) {
  const { id } = await params;
  const thread = MOCK_DB[id]; // If ID doesn't exist, show 404
  if (!thread) {
    return notFound();
  }

  return (
    <main className="min-h-screen w-full bg-black text-white p-4 md:p-8 flex flex-col items-center">
      {/* Back Button */}
      <div className="w-full max-w-3xl mb-6">
        <Link
          href="/thread"
          className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2 text-sm"
        >
          ← Back to Feed
        </Link>
      </div>

      {/* --- THE EXPANDED POST --- */}
      <div className="w-full max-w-3xl bg-neutral-900/50 border border-purple-500/50 rounded-2xl overflow-hidden backdrop-blur-md">
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-400 font-bold">
            {thread.author[0].toUpperCase()}
          </div>
          <div>
            <h1 className="text-white font-semibold">@{thread.author}</h1>
            <p className="text-neutral-500 text-xs">Posted 2 hours ago</p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          <p className="text-lg md:text-xl font-extrabold leading-relaxed text-neutral-100">
            {thread.topic}
          </p>

          {/* Big Expanded Image */}
          {thread.image && (
            <div className="rounded-xl overflow-hidden border border-white/10">
              <img
                src={thread.image}
                alt="Thread attachment"
                className="w-full h-auto max-h-[500px] object-cover"
              />
            </div>
          )}

          {thread.content && <div>{thread.content}</div>}
        </div>

        {/* Stats Bar */}
        <div className="px-6 py-4 bg-black/20 border-t border-white/5 flex gap-6 text-sm text-neutral-400">
          <span>{thread.initialLikes || 0} Likes</span>
          <span>{thread.comments?.length || 0} Comments</span>
        </div>
      </div>

      {/* --- COMMENTS SECTION --- */}
      <div className="w-full max-w-3xl mt-8">
        <h3 className="text-lg font-semibold mb-4 text-purple-200">Comments</h3>

        <div className="space-y-4">
          {thread.comments?.length === 0 ? (
            <p className="text-neutral-500 italic">
              No comments yet. Be the first!
            </p>
          ) : (
            thread.comments?.map((comment) => (
              <div
                key={comment.id}
                className="p-4 rounded-xl bg-white/5 border border-white/5"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-purple-400">
                    @{comment.user}
                  </span>
                  <span className="text-xs text-neutral-600">Just now</span>
                </div>
                <p className="text-neutral-300">{comment.text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
