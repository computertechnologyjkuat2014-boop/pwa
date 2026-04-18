// features/football/GameForm.tsx
"use client";

import { useState } from "react";
import { LEAGUES, LeagueKey } from "@/types/football";

interface GameFormProps {
  league: LeagueKey;
  matchday: number;
  onAddGame: (homeTeam: string, awayTeam: string, date?: string) => void;
}

export default function GameForm({
  league,
  matchday,
  onAddGame,
}: GameFormProps) {
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [date, setDate] = useState("");

  const teams = LEAGUES[league].teams;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (homeTeam && awayTeam && homeTeam !== awayTeam) {
      onAddGame(homeTeam, awayTeam, date || undefined);
      setHomeTeam("");
      setAwayTeam("");
      setDate("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h3 className="text-xl font-semibold mb-4">
        Add Game for {LEAGUES[league].name} Matchday {matchday}
      </h3>
      <div>
        <label className="block text-sm font-medium mb-2">Home Team:</label>
        <select
          value={homeTeam}
          onChange={(e) => setHomeTeam(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Home Team</option>
          {teams.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Away Team:</label>
        <select
          value={awayTeam}
          onChange={(e) => setAwayTeam(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Away Team</option>
          {teams.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">
          Date (optional):
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Game
      </button>
    </form>
  );
}
