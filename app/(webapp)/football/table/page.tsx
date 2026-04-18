// app/(webapp)/football/table/page.tsx
"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/db";
import { Game, LEAGUES, LeagueKey } from "@/types/football";

interface TeamStats {
  name: string;
  points: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
}

export default function TablePage() {
  const [league, setLeague] = useState<LeagueKey>("EPL");
  const [teamStats, setTeamStats] = useState<TeamStats[]>([]);

  useEffect(() => {
    loadTable(league);
  }, [league]);

  const loadTable = async (lg: LeagueKey) => {
    const games = await db.games.where("league").equals(lg).toArray();
    const stats: { [key: string]: TeamStats } = {};

    // Initialize stats for all teams in the league
    LEAGUES[lg].teams.forEach((team) => {
      stats[team] = {
        name: team,
        points: 0,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
      };
    });

    // Calculate stats from games with actual outcomes
    games.forEach((game) => {
      if (!game.actualOutcome) return;

      const home = game.homeTeam;
      const away = game.awayTeam;

      stats[home].played++;
      stats[away].played++;

      if (game.actualOutcome === "home") {
        stats[home].won++;
        stats[home].points += 3;
        stats[away].lost++;
      } else if (game.actualOutcome === "draw") {
        stats[home].drawn++;
        stats[away].drawn++;
        stats[home].points += 1;
        stats[away].points += 1;
      } else if (game.actualOutcome === "away") {
        stats[away].won++;
        stats[away].points += 3;
        stats[home].lost++;
      }
    });

    // Sort by points descending
    const sortedStats = Object.values(stats).sort(
      (a, b) => b.points - a.points,
    );
    setTeamStats(sortedStats);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">League Table</h1>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Select League:</label>
        <select
          value={league}
          onChange={(e) => setLeague(e.target.value as LeagueKey)}
          className="border border-gray-300 min-w-1/3 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.entries(LEAGUES).map(([key, leagueData]) => (
            <option key={key} value={key}>
              {leagueData.name}
            </option>
          ))}
        </select>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Position</th>
            <th className="py-2 px-4 border-b">Team</th>
            <th className="py-2 px-4 border-b">Played</th>
            <th className="py-2 px-4 border-b">Won</th>
            <th className="py-2 px-4 border-b">Drawn</th>
            <th className="py-2 px-4 border-b">Lost</th>
            <th className="py-2 px-4 border-b">Points</th>
          </tr>
        </thead>
        <tbody>
          {teamStats.map((team, index) => (
            <tr key={team.name} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b text-center">{index + 1}</td>
              <td className="py-2 px-4 border-b">{team.name}</td>
              <td className="py-2 px-4 border-b text-center">{team.played}</td>
              <td className="py-2 px-4 border-b text-center">{team.won}</td>
              <td className="py-2 px-4 border-b text-center">{team.drawn}</td>
              <td className="py-2 px-4 border-b text-center">{team.lost}</td>
              <td className="py-2 px-4 border-b text-center font-semibold">
                {team.points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
