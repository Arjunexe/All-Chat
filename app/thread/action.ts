"use server";

interface createThreadData {
  title: string;
  content?: string;
  imageUrl?: string | null;
}

export async function createThreadAction(data: createThreadData) {
  const { title, content, imageUrl } = data;

  console.log("data is here I thinkKKKk : ", title, content, imageUrl);
}
