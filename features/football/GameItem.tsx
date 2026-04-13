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
    <li className="bg-gray-50 p-4 rounded-md shadow-sm">
      <div className="flex justify-between items-center">
        <div>
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
            <div>
              <div>Predicted: {game.predictedOutcome || "Not set"}</div>
              <div>Actual: {game.actualOutcome || "Not set"}</div>
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
    </li>
  );
}
