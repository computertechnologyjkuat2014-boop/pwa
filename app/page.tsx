// app/page.tsx
import Link from "next/link";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react"; // Optional: npm install lucide-react

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-900">
      {/* Header Section */}
      <header className="text-center mb-12">
        <div
          className="bg-indigo-600 w-16 h-16 rounded-2xl flex items-center 
          justify-center mx-auto mb-4 shadow-lg shadow-indigo-200"
        >
          <Wallet className="text-white w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">FinTrack</h1>
        <p className="text-slate-500 mt-2 font-medium">
          Manage your flow, even offline.
        </p>
      </header>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        {/* Earnings Card */}
        <Link
          href="/earning"
          className="group relative overflow-hidden bg-white p-8 rounded-3xl border border-slate-200 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 active:scale-95"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-50 rounded-xl group-hover:bg-emerald-500 transition-colors">
              <TrendingUp className="text-emerald-600 w-6 h-6 group-hover:text-white" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-emerald-600">
              Inflow
            </span>
          </div>
          <h2 className="text-2xl font-bold">Earnings</h2>
          <p className="text-slate-500 mt-1">
            Log your salary, dividends, and gifts.
          </p>
          <div className="mt-6 flex items-center text-emerald-600 font-semibold text-sm">
            Add Income <span>→</span>
          </div>
        </Link>

        {/* Expenses Card */}
        <Link
          href="/expense"
          className="group relative overflow-hidden bg-white p-8 rounded-3xl border border-slate-200 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 active:scale-95"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-rose-50 rounded-xl group-hover:bg-rose-500 transition-colors">
              <TrendingDown className="text-rose-600 w-6 h-6 group-hover:text-white" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-rose-600">
              Outflow
            </span>
          </div>
          <h2 className="text-2xl font-bold">Expenses</h2>
          <p className="text-slate-500 mt-1">Track daily spending and bills.</p>
          <div className="mt-6 flex items-center text-rose-600 font-semibold text-sm">
            Log Spend <span>→</span>
          </div>
        </Link>
      </div>

      {/* Offline Status Badge (Preview) */}
      <footer className="mt-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-500 shadow-sm">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          Ready for Offline Use
        </div>
      </footer>
    </main>
  );
}
