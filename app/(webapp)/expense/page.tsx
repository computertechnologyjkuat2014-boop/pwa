// app/expenses/page.tsx
"use client";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";

import { Expense } from "@/types/expense";
import ExpenseForm from "@/features/expenses/ExpenseForm";
import ExpenseList from "@/features/expenses/ExpenseList";
import Link from "next/link";
import { ArrowLeft, TrendingDown } from "lucide-react";

export default function ExpensesPage() {
  // Automatically updates the list whenever data changes in IndexedDB
  const expenses = useLiveQuery(() => db.expenses.toArray()) || [];

  const handleAdd = async (expense: Omit<Expense, "id">) => {
    // Add to IndexedDB (Offline-first)
    await db.expenses.add({
      ...expense,
      id: Date.now().toString(),
    });
  };

  const handleDelete = async (id: string) => {
    await db.expenses.delete(id);
  };

  const dailyTotal = expenses.reduce((total, exp) => total + exp.amount, 0);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <main className="max-w-2xl mx-auto p-4 space-y-8">
        <div className="bg-rose-700 rounded-3xl p-6 text-white shadow-lg shadow-rose-100 flex items-center justify-between overflow-hidden relative">
          <div className="relative z-10">
            <p className="text-rose-100 text-xs font-bold uppercase tracking-wider">
              Total OutFlow
            </p>
            <h2 className="text-3xl font-bold mt-1">
              ${dailyTotal.toLocaleString()}
            </h2>
          </div>
        </div>
        <ExpenseForm onAdd={handleAdd} />
        <ExpenseList expenses={expenses} onDelete={handleDelete} />
      </main>
    </div>
  );
}
// app/expenses/page.tsx
