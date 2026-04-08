import { Topic } from "@/types/topic";
import Link from "next/link";

export default function TopicList({
  topics,
  onDelete,
}: {
  topics: Topic[];
  onDelete: (id: string) => void;
}) {
  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Research Topics</h2>
      <ul className="list-decimal list-inside mt-4 space-y-2">
        {topics.map((topic) => (
          <li key={topic.id} className="text-blue-600 hover:underline">
            <Link href={`/topics/${topic.id}`}>{topic.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
