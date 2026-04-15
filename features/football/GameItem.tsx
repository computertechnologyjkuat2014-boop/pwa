// features/football/GameItem.tsx
"use client";

import { useState } from "react";
import { Game } from "@/types/football";

interface GameItemProps {
  game: Game;
  onUpdate: (id: string, updates: Partial<Game>) => void;
}

export default function GameItem({ game, onUpdate }: GameItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [predicted, setPredicted] = useState(game.predictedOutcome || "");
  const [actual, setActual] = useState(game.actualOutcome || "");

  const handleSave = () => {
    onUpdate(game.id, {
      predictedOutcome: predicted as "home" | "draw" | "away" | undefined,
      actualOutcome: actual as "home" | "draw" | "away" | undefined,
    });
    setIsEditing(false);
  };

  return (
    <div className="flex  items-center py-4 border-b border-gray-200">
      <div className="w-1/2">
        <span className="font-semibold">{game.homeTeam}</span> vs{" "}
        <span className="font-semibold">{game.awayTeam}</span>
        {game.date && (
          <span className="text-sm text-gray-600 ml-2">on {game.date}</span>
        )}
      </div>
      <div className="text-sm">
        {isEditing ? (
          <div className="space-y-2">
            <select
              value={predicted}
              onChange={(e) => setPredicted(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-xs"
            >
              <option value="">Predicted</option>
              <option value="home">Home</option>
              <option value="draw">Draw</option>
              <option value="away">Away</option>
            </select>
            <select
              value={actual}
              onChange={(e) => setActual(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-xs"
            >
              <option value="">Actual</option>
              <option value="home">Home</option>
              <option value="draw">Draw</option>
              <option value="away">Away</option>
            </select>
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-2 py-1 rounded text-xs ml-2"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-2 py-1 rounded text-xs ml-1"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex space-x-4 items-center">
            <div>
              Predicted:{" "}
              <span className="font-semibold">
                {game.predictedOutcome || "Not set"}
              </span>
            </div>
            <div>
              Actual:{" "}
              <span className="font-semibold">
                {game.actualOutcome || "Not set"}
              </span>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-2 py-1 rounded text-xs mt-1"
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
