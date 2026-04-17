"use client";

import { Fixture } from "@/types/football";

interface ActualOutcomeUpdaterProps {
  fixture: Fixture;
  onUpdateOutcome: (
    fixtureId: string,
    outcome: "home" | "draw" | "away",
  ) => void;
}

export default function ActualOutcomeUpdater({
  fixture,
  onUpdateOutcome,
}: ActualOutcomeUpdaterProps) {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
      <h5 className="text-sm font-semibold text-gray-800 mb-3">
        Set Actual Outcome
      </h5>
      <div className="flex gap-2">
        <button
          onClick={() => onUpdateOutcome(fixture.id, "home")}
          className={`flex-1 py-2 px-3 rounded text-sm font-medium transition ${
            fixture.actualOutcome === "home"
              ? "bg-green-600 text-white"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          {fixture.homeTeam} Won
        </button>
        <button
          onClick={() => onUpdateOutcome(fixture.id, "draw")}
          className={`flex-1 py-2 px-3 rounded text-sm font-medium transition ${
            fixture.actualOutcome === "draw"
              ? "bg-blue-600 text-white"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          Draw
        </button>
        <button
          onClick={() => onUpdateOutcome(fixture.id, "away")}
          className={`flex-1 py-2 px-3 rounded text-sm font-medium transition ${
            fixture.actualOutcome === "away"
              ? "bg-red-600 text-white"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          {fixture.awayTeam} Won
        </button>
        {fixture.actualOutcome && (
          <button
            onClick={() => onUpdateOutcome(fixture.id, "draw")}
            className="py-2 px-3 rounded text-sm font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
