"use client";
import { useState, useEffect } from "react";
import { Plus, Receipt, DollarSign, Calendar, Tag } from "lucide-react";
import { Expense } from "@/types/expense";

interface Props {
  onAdd: (expense: Omit<Expense, "id">) => void;
}

export default function ExpenseForm({ onAdd }: Props) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Food");

  useEffect(() => {
    setDate(new Date().toISOString().split("T")[0]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      description,
      amount: parseFloat(amount),
      category,
      date: date ? new Date(date).toISOString() : new Date().toISOString(),
    });
    setDescription("");
    setAmount("");
  };

  return (
    <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Description Input */}
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 ml-1">
            Description
          </label>
          <div className="relative">
            <Receipt className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="What did you buy?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-rose-500 transition-all outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Amount Input */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 ml-1">
              Amount
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-rose-500 transition-all outline-none"
              />
            </div>
          </div>

          {/* Date Input */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 ml-1">
              Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-rose-500 transition-all outline-none text-slate-600"
              />
            </div>
          </div>
        </div>

        {/* Category Select */}
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 ml-1">
            Category
          </label>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-rose-500 transition-all outline-none appearance-none text-slate-600"
            >
              <option>Food & Drink</option>
              <option>Transport</option>
              <option>Shopping</option>
              <option>Bills</option>
              <option>Entertainment</option>
            </select>
          </div>
        </div>

        <button
          className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 
            rounded-2xl shadow-lg shadow-rose-100 transition-all active:scale-95 flex items-center 
            justify-center gap-2"
          type="submit"
        >
          <Plus className="w-5 h-5" /> Save Expense
        </button>
      </form>
    </section>
  );
}
