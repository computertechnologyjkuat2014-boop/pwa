"use client";

import { useState, useEffect } from "react";
import { ALL_TEAMS, LEAGUES, LeagueKey } from "@/types/football";
import { db } from "@/lib/db";

interface FixtureFormProps {
  leagueWeek: number;
  onAddFixture: (homeTeam: string, awayTeam: string, date: string) => void;
}

export default function FixtureForm({
  leagueWeek,
  onAddFixture,
}: FixtureFormProps) {
  const [selectedLeague, setSelectedLeague] = useState("EPL" as LeagueKey);
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [date, setDate] = useState("");

  const availableTeams = [...(ALL_TEAMS[selectedLeague] || [])];

  const allTeamsForLeague = [...availableTeams];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (homeTeam && awayTeam && homeTeam !== awayTeam && date) {
      onAddFixture(homeTeam, awayTeam, date);
      setHomeTeam("");
      setAwayTeam("");
      setDate("");
    } else {
      alert("Please select different teams and a date");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h3 className="text-xl font-semibold mb-4">
        Add Fixture for Week {leagueWeek}
      </h3>

      {/* League Selection */}
      <div>
        <label className="block text-sm font-medium mb-2">League:</label>
        <select
          value={selectedLeague}
          onChange={(e) => {
            setSelectedLeague(e.target.value as LeagueKey);
            setHomeTeam("");
            setAwayTeam("");
          }}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.entries(LEAGUES).map(([key, leagueData]) => (
            <option key={key} value={key}>
              {leagueData.name}
            </option>
          ))}
        </select>
      </div>

      {/* Home Team */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium">Home Team:</label>
        </div>

        <select
          value={homeTeam}
          onChange={(e) => setHomeTeam(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Home Team</option>
          {allTeamsForLeague.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
      </div>

      {/* Away Team */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium">Away Team:</label>
        </div>

        <select
          value={awayTeam}
          onChange={(e) => setAwayTeam(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Away Team</option>
          {allTeamsForLeague.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
      </div>

      {/* Match Date */}
      <div>
        <label className="block text-sm font-medium mb-2">Match Date:</label>
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
      >
        Add Fixture
      </button>
    </form>
  );
}
