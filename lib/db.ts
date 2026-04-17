// lib/db.ts
import { Expense } from "@/types/expense";
import { ScheduleItem } from "@/types/schedule";
import { Topic } from "@/types/topic";
import { Game, Fixture, Prediction } from "@/types/football";
import Dexie, { Table } from "dexie";

export class MyDatabase extends Dexie {
  expenses!: Table<Expense>;
  schedules!: Table<ScheduleItem>;
  topics!: Table<Topic>;
  games!: Table<Game>;
  fixtures!: Table<Fixture>;
  predictions!: Table<Prediction>;

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
    // Add version 3 for fixtures and predictions
    this.version(3).stores({
      fixtures: "++id, date, leagueWeek, createdAt",
      predictions: "++id, fixtureId, userId, createdAt, updatedAt",
    });
    // Add version 4 for custom teams
    this.version(4).stores({
      customTeams: "++id, name, league, createdAt",
    });
    // Add version 5 for actual outcome field on fixtures
    this.version(5).stores({
      fixtures: "++id, date, leagueWeek, createdAt, actualOutcome",
    });
  }
}

export const db = new MyDatabase();
