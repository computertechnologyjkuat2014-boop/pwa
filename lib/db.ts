// lib/db.ts
import { Expense } from "@/types/expense";
import { ScheduleItem } from "@/types/schedule";
import { Topic } from "@/types/topic";
import Dexie, { Table } from "dexie";

export class MyDatabase extends Dexie {
  expenses!: Table<Expense>;
  schedules!: Table<ScheduleItem>;
  topics!: Table<Topic>;

  constructor() {
    super("FinanceApp");
    // Schema definition: id is primary, index fields for search
    this.version(1).stores({
      expenses: "++id, description, amount, category, date",
      schedules: "++id, activity, date, startTime",
      topics: "++id, title, description, createdAt, updatedAt",
    });
  }
}

export const db = new MyDatabase();
