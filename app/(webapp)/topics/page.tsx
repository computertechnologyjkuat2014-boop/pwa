"use client";

import TopicForm from "@/features/topics/TopicForm";
import TopicList from "@/features/topics/TopicList";
import { db } from "@/lib/db";
import { Topic } from "@/types/topic";
import { useLiveQuery } from "dexie-react-hooks";

export default function TopicsPage() {
  const topics = useLiveQuery(() => db.topics.toArray()) || [];

  const handleAdd = async (
    topic: Omit<Topic, "id" | "createdAt" | "updatedAt">,
  ) => {
    const timestamp = new Date().toISOString();
    await db.topics.add({
      ...topic,
      id: Date.now().toString(),
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  };

  const handleDelete = async (id: string) => {
    await db.topics.delete(id);
  };

  return (
    <div className="text-sm">
      <h1 className="text-2xl font-bold mb-4">Research Topics</h1>
      <div className="flex flex-col md:flex-row">
        {/* Topics Form */}
        <div className="md:w-1/2 mb-4">
          <TopicForm onAdd={handleAdd} />
        </div>

        {/* Topics List */}
        <div className="md:w-1/2 md:pl-8">
          <TopicList topics={topics} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}
