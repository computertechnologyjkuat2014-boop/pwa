"use client";

import { Topic } from "@/types/topic";
import { useState } from "react";

export default function TopicForm({
  onAdd,
}: {
  onAdd: (topic: Omit<Topic, "id" | "createdAt" | "updatedAt">) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Create Topic</h2>
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
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-amber-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          Create Topic
        </button>
      </form>
    </div>
  );
}
