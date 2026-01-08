"use server";

import threadModal from "@/lib/models/Threads";
import { connectDB } from "@/lib/db";

interface createThreadData {
  title: string;
  content?: string;
  imageUrl?: string | null;
}

export async function createThreadAction(data: createThreadData) {
  const { title, content, imageUrl } = data;

  try {
    await connectDB();
    const newThread = new threadModal({
      title: title,
      content: content,
      postImage: imageUrl,
    });
    await newThread.save();
  } catch (error) {
    console.error("something went wrong during creating the thread", error);
    return { error: "System Error: Please try again later." };
  }
}
