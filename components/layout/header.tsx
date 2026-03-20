import { Wallet } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full bg-slate-100 p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="bg-indigo-600 w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
          <Wallet className="text-white w-5 h-5" />
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-900">
          FinTrack
        </span>
      </div>
      <div className="space-x-4">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          Sign In
        </button>
      </div>
    </nav>
  );
}
