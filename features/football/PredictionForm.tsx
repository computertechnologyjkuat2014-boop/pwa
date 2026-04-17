"use client";

import { useState } from "react";
import { Fixture } from "@/types/football";

interface PredictionFormProps {
  fixtures: Fixture[];
  onAddPredictions: (
    predictions: Array<{
      fixtureId: string;
      prediction: "home" | "draw" | "away";
    }>,
  ) => void;
}

export default function PredictionForm({
  fixtures,
  onAddPredictions,
}: PredictionFormProps) {
  const [userId, setUserId] = useState("");
  const [predictions, setPredictions] = useState<{
    [key: string]: "home" | "draw" | "away" | "";
  }>({});

  const handlePredictionChange = (
    fixtureId: string,
    value: "home" | "draw" | "away" | "",
  ) => {
    setPredictions((prev) => ({
      ...prev,
      [fixtureId]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId.trim()) {
      alert("Please enter a user name");
      return;
    }

    const allPredictions = Object.entries(predictions)
      .filter(([_, prediction]) => prediction !== "")
      .map(([fixtureId, prediction]) => ({
        fixtureId,
        prediction: prediction as "home" | "draw" | "away",
      }));

    if (allPredictions.length === 0) {
      alert("Please select predictions for at least one fixture");
      return;
    }

    onAddPredictions(allPredictions);
    setUserId("");
    setPredictions({});
  };

  if (fixtures.length === 0) {
    return (
      <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400">
        <p className="text-yellow-800">
          No fixtures available. Please create fixtures first.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-6"
    >
      <h3 className="text-2xl font-semibold mb-6">Add Predictions</h3>

      {/* User Name Input */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Your Name / User ID:
        </label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter your name"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Fixtures Predictions Grid */}
      <div>
        <label className="block text-sm font-medium mb-4">
          Predict match outcomes:
        </label>
        <div className="flex flex-col gap-4">
          {fixtures.map((fixture) => (
            <div
              key={fixture.id}
              className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-blue-50 transition"
            >
              <div className="mb-3">
                <p className="text-sm text-gray-600 mb-1">
                  Week {fixture.leagueWeek}
                </p>
                <p className="font-semibold text-gray-800">
                  {fixture.homeTeam} vs {fixture.awayTeam}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(fixture.date).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-2">
                <label className="flex items-center gap-2 flex-1 cursor-pointer">
                  <input
                    type="radio"
                    name={`prediction-${fixture.id}`}
                    value="home"
                    checked={predictions[fixture.id] === "home"}
                    onChange={() => handlePredictionChange(fixture.id, "home")}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{fixture.homeTeam}</span>
                </label>
                <label className="flex items-center gap-2 flex-1 cursor-pointer">
                  <input
                    type="radio"
                    name={`prediction-${fixture.id}`}
                    value="draw"
                    checked={predictions[fixture.id] === "draw"}
                    onChange={() => handlePredictionChange(fixture.id, "draw")}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Draw</span>
                </label>
                <label className="flex items-center gap-2 flex-1 cursor-pointer">
                  <input
                    type="radio"
                    name={`prediction-${fixture.id}`}
                    value="away"
                    checked={predictions[fixture.id] === "away"}
                    onChange={() => handlePredictionChange(fixture.id, "away")}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{fixture.awayTeam}</span>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition"
      >
        Submit All Predictions
      </button>
    </form>
  );
}
