// app/(webapp)/football/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import { Game, LEAGUES, LeagueKey } from "@/types/football";
import GameForm from "@/features/football/GameForm";
import GameList from "@/features/football/GameList";

export default function FootballPage() {
  const [league, setLeague] = useState<LeagueKey>("EPL");
  const [matchday, setMatchday] = useState(1);
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    loadGames(league, matchday);
  }, [league, matchday]);

  const loadGames = async (lg: LeagueKey, md: number) => {
    const gameList = await db.games
      .where("league")
      .equals(lg)
      .filter((g) => g.matchday === md)
      .toArray();

    setGames(gameList);
  };

  const handleUpdateGame = async (id: string, updates: Partial<Game>) => {
    await db.games.update(id, updates);
    loadGames(league, matchday);
  };

  const handleAddGame = async (
    homeTeam: string,
    awayTeam: string,
    date?: string,
  ) => {
    await db.games.add({
      id: crypto.randomUUID(),
      homeTeam,
      awayTeam,
      matchday,
      league,
      date,
    });
    loadGames(league, matchday);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Football Matchdays</h1>
      <div className="mb-6">
        <Link href="/football/table" className="text-blue-500 hover:underline">
          View League Table
        </Link>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Select League:</label>
        <select
          value={league}
          onChange={(e) => {
            setLeague(e.target.value as LeagueKey);
            setMatchday(1); // Reset matchday when league changes
          }}
          className="border border-gray-300 min-w-1/3 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.entries(LEAGUES).map(([key, leagueData]) => (
            <option key={key} value={key}>
              {leagueData.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Select Matchday:
        </label>
        <select
          value={matchday}
          onChange={(e) => setMatchday(Number(e.target.value))}
          className="border border-gray-300 min-w-1/3 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Array.from(
            { length: LEAGUES[league].matchdays },
            (_, i) => i + 1,
          ).map((md) => (
            <option key={md} value={md}>
              Matchday {md}{" "}
            </option>
          ))}
        </select>
      </div>
      <GameForm league={league} matchday={matchday} onAddGame={handleAddGame} />
      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Games for {LEAGUES[league].name} Matchday {matchday}
      </h2>
      <GameList games={games} onUpdateGame={handleUpdateGame} />
    </div>
  );
}
