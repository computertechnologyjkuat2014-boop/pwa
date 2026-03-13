"use client";

import { Expense } from "@/types/expense";
import { Trash2 } from "lucide-react";

interface Props {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

export default function ExpenseList({ expenses: expenses, onDelete }: Props) {
  return (
    <section>
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 ml-1">
        Recent Expenses
      </h3>
      <div className="space-y-3">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="group bg-white p-4 rounded-2xl flex items-center 
            justify-between border 
            border-slate-100 shadow-sm hover:border-rose-200 transition-all"
          >
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center 
                text-rose-600 font-bold group-hover:bg-rose-600 
                group-hover:text-white transition-colors"
              >
                {expense.description[0]}
              </div>
              <div>
                <h4 className="font-bold text-slate-800">
                  {expense.description}
                </h4>
                <p className="text-xs text-slate-400 font-medium">
                  {expense.category} •{" "}
                  {new Date(expense.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-bold text-slate-900">
                -${expense.amount.toFixed(2)}
              </span>
              <button
                className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                onClick={() => onDelete(expense.id)}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
