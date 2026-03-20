"use client";

import { routeMeta } from "@/lib/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  return (
    <div className="w-64 bg-slate-100 h-screen p-6">
      <h2 className="text-2xl font-bold mb-6">FinTrack</h2>
      <nav className="space-y-4">
        {routeMeta &&
          Object.entries(routeMeta).map(([path, meta]) => (
            <Link
              key={path}
              href={path}
              className={`${isActive(path) ? "bg-slate-200 text-amber-800" : "hover:bg-slate-200"} block px-4 py-2 rounded-lg transition-colors`}
            >
              {meta.breadcrumb}
            </Link>
          ))}
      </nav>
    </div>
  );
}
