// lib/db.ts
import { Expense } from "@/types/expense";
import { ScheduleItem } from "@/types/schedule";
import { Topic } from "@/types/topic";
import { Game } from "@/types/football";
import Dexie, { Table } from "dexie";

export class MyDatabase extends Dexie {
  expenses!: Table<Expense>;
  schedules!: Table<ScheduleItem>;
  topics!: Table<Topic>;
  games!: Table<Game>;

  constructor() {
    super("FinanceApp");
    // Schema definition: id is primary, index fields for search
    this.version(1).stores({
      expenses: "++id, description, amount, category, date",
      schedules: "++id, activity, date, startTime",
      topics: "++id, title, description, createdAt, updatedAt",
    });
    // Add version 2 for games
    this.version(2).stores({
      games:
        "++id, homeTeam, awayTeam, matchday, date, predictedOutcome, actualOutcome",
    });
  }
}

export const db = new MyDatabase();
