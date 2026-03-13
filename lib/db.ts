// lib/db.ts
import { Expense } from "@/types/expense";
import Dexie, { Table } from "dexie";

export class MyDatabase extends Dexie {
  expenses!: Table<Expense>;

  constructor() {
    super("FinanceApp");
    // Schema definition: id is primary, index fields for search
    this.version(1).stores({
      expenses: "++id, description, amount, category, date",
    });
  }
}

export const db = new MyDatabase();
