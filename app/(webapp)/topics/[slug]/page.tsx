"use client";

import { db } from "@/lib/db";
import { Topic } from "@/types/topic";
import { useLiveQuery } from "dexie-react-hooks";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
export default function TopicDetailsPage() {
  const useparam = useParams();
  const topicId: string = useparam.slug as string;
  console.log("Topic ID from URL:", topicId);

  const topic = useLiveQuery(async () => {
    if (topicId) {
      const result = await db.topics.get(topicId);
      console.log("Fetched topic from DB:", result);
      return result;
    }
  });

  const handleDelete = async (id: string) => {
    await db.topics.delete(id);
    redirect("/topics");
  };

  const [title, setTitle] = useState(topic?.title || "");
  const [description, setDescription] = useState(topic?.description || "");

  useEffect(() => {
    if (topic) {
      setTitle(topic.title || "");
      setDescription(topic.description || "");
    }
  }, [topic]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (topicId) {
      await db.topics.update(topicId, {
        title,
        description,
        updatedAt: new Date().toISOString(),
      });

      redirect("/topics"); // Redirect back to topics list after update
    }
  };

  return (
    <div className="text-sm">
      <h4 className="text-blue-950 text-2xl mt-3">Update Topic</h4>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-slate-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            placeholder="Enter topic name"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-slate-700"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-slate-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            placeholder="Enter topic description"
          />
        </div>
        <div className="flex flex-col md:flex-row">
          {/* Topics Form */}
          <div className="mr-4 mb-4">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-amber-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              Update Topic
            </button>
          </div>
          <div>
            <button
              onClick={() => handleDelete(topicId!)}
              className=" inline-flex items-center justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Delete Topic
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
