"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  Plus,
  Landmark,
  Briefcase,
  Calendar,
  DollarSign,
  Trash2,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export default function EarningsPage() {
  // Mock State (To be replaced with Dexie.js hooks)
  const [earnings, setEarnings] = useState([
    {
      id: "1",
      description: "Monthly Salary",
      amount: 4500.0,
      category: "Work",
      date: "2026-03-01",
    },
    {
      id: "2",
      description: "Freelance Design",
      amount: 350.0,
      category: "Side Hustle",
      date: "2026-03-10",
    },
  ]);

  const totalEarned = earnings.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Navigation Header */}
      <nav className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-10 px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-slate-600" />
          </Link>
          <h1 className="font-bold text-lg text-emerald-700">Earnings Log</h1>
          <div className="w-10"></div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Quick Stats Summary */}
        <div className="bg-emerald-600 rounded-3xl p-6 text-white shadow-lg shadow-emerald-100 flex items-center justify-between overflow-hidden relative">
          <div className="relative z-10">
            <p className="text-emerald-100 text-xs font-bold uppercase tracking-wider">
              Total Inflow
            </p>
            <h2 className="text-3xl font-bold mt-1">
              ${totalEarned.toLocaleString()}
            </h2>
          </div>
          <TrendingUp className="w-24 h-24 absolute -right-4 -bottom-4 text-emerald-500/30 rotate-12" />
        </div>

        {/* Input Form Card */}
        <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <div className="space-y-4">
            {/* Description Input */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 ml-1 text-emerald-600">
                Source Name
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Where is the money from?"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Amount Input */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 ml-1 text-emerald-600">
                  Amount
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none font-bold text-emerald-700"
                  />
                </div>
              </div>

              {/* Date Input */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 ml-1 text-emerald-600">
                  Date Received
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="date"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none text-slate-600"
                  />
                </div>
              </div>
            </div>

            {/* Category Select */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 ml-1 text-emerald-600">
                Category
              </label>
              <div className="relative">
                <Landmark className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none appearance-none text-slate-600">
                  <option>Salary</option>
                  <option>Freelance</option>
                  <option>Investments</option>
                  <option>Gifts</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-100 transition-all active:scale-95 flex items-center justify-center gap-2">
              <Plus className="w-5 h-5" /> Add to Income
            </button>
          </div>
        </section>

        {/* History List */}
        <section>
          <div className="flex items-center justify-between mb-4 ml-1">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
              Income History
            </h3>
            <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
              MARCH 2026
            </span>
          </div>
          <div className="space-y-3">
            {earnings.map((item) => (
              <div
                key={item.id}
                className="group bg-white p-4 rounded-2xl flex items-center justify-between border border-slate-100 shadow-sm hover:border-emerald-200 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 font-bold group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">
                      {item.description}
                    </h4>
                    <p className="text-xs text-slate-400 font-medium">
                      {item.category} • {item.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-emerald-600">
                    +${item.amount.toFixed(2)}
                  </span>
                  <button className="p-2 text-slate-300 hover:text-rose-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
