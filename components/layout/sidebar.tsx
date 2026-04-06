"use client";

import { routeMeta } from "@/lib/routes";
import { MenuIcon, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <div className="w-full md:w-64 bg-slate-100 md:h-screen p-6 sticky top-0 z-20 shadow-sm md:shadow-none border-b border-slate-200 md:border-b-0 md:border-r md:border-slate-200">
      <div className="flex items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold">FinTrack</h2>
        <button
          type="button"
          onClick={() => setCollapsed((prev) => !prev)}
          className={`flex md:hidden rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm 
            font-medium text-slate-700 transition hover:bg-slate-50 
            focus:outline-none focus:ring-2 focus:ring-amber-400`}
          aria-expanded={!collapsed}
        >
          {collapsed ? (
            <MenuIcon className="inline-block " size={20} />
          ) : (
            <X className="inline-block " size={20} />
          )}{" "}
        </button>
      </div>

      <nav className={`md:block ${collapsed ? "hidden" : "block"} space-y-4`}>
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
