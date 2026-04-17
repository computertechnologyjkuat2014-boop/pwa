"use client";

import { useState, useEffect } from "react";
import { ALL_TEAMS, LEAGUES } from "@/types/football";
import { db } from "@/lib/db";

interface FixtureFormProps {
  leagueWeek: number;
  onAddFixture: (homeTeam: string, awayTeam: string, date: string) => void;
}

export default function FixtureForm({
  leagueWeek,
  onAddFixture,
}: FixtureFormProps) {
  const [selectedLeague, setSelectedLeague] = useState(LEAGUES.EPL);
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [date, setDate] = useState("");
  const [showCustomTeamInput, setShowCustomTeamInput] = useState<
    "home" | "away" | null
  >(null);
  const [customTeamName, setCustomTeamName] = useState("");
  const [customTeamLeague, setCustomTeamLeague] = useState("");

  const availableTeams = [...(ALL_TEAMS[selectedLeague] || [])];

  const allTeamsForLeague = [...availableTeams];

  const handleAddCustomTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTeamName.trim()) {
      alert("Please enter a team name");
      return;
    }

    setCustomTeamName("");
    setCustomTeamLeague("");
    setShowCustomTeamInput(null);
  };

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
            setSelectedLeague(e.target.value);
            setHomeTeam("");
            setAwayTeam("");
          }}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.values(LEAGUES).map((league) => (
            <option key={league} value={league}>
              {league}
            </option>
          ))}
        </select>
      </div>

      {/* Home Team */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium">Home Team:</label>
          {!showCustomTeamInput && (
            <button
              type="button"
              onClick={() => setShowCustomTeamInput("home")}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              Add Custom Team
            </button>
          )}
        </div>

        {showCustomTeamInput === "home" ? (
          <form
            onSubmit={handleAddCustomTeam}
            className="space-y-2 p-3 bg-blue-50 rounded-lg mb-2"
          >
            <input
              type="text"
              value={customTeamName}
              onChange={(e) => setCustomTeamName(e.target.value)}
              placeholder="Enter team name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <input
              type="text"
              value={customTeamLeague}
              onChange={(e) => setCustomTeamLeague(e.target.value)}
              placeholder="League (optional)"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-3 rounded"
              >
                Save Team
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCustomTeamInput(null);
                  setCustomTeamName("");
                  setCustomTeamLeague("");
                }}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 text-sm py-1 px-3 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
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
        )}
      </div>

      {/* Away Team */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium">Away Team:</label>
          {!showCustomTeamInput && (
            <button
              type="button"
              onClick={() => setShowCustomTeamInput("away")}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              Add Custom Team
            </button>
          )}
        </div>

        {showCustomTeamInput === "away" ? (
          <form
            onSubmit={handleAddCustomTeam}
            className="space-y-2 p-3 bg-blue-50 rounded-lg mb-2"
          >
            <input
              type="text"
              value={customTeamName}
              onChange={(e) => setCustomTeamName(e.target.value)}
              placeholder="Enter team name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <input
              type="text"
              value={customTeamLeague}
              onChange={(e) => setCustomTeamLeague(e.target.value)}
              placeholder="League (optional)"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-3 rounded"
              >
                Save Team
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCustomTeamInput(null);
                  setCustomTeamName("");
                  setCustomTeamLeague("");
                }}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 text-sm py-1 px-3 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
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
        )}
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
