"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/db";
import { Fixture, Prediction } from "@/types/football";
import FixtureForm from "@/features/football/FixtureForm";
import PredictionForm from "@/features/football/PredictionForm";
import PredictionList from "@/features/football/PredictionList";

export default function BettingPage() {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [leagueWeekInput, setLeagueWeekInput] = useState(1);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load fixtures, predictions, and custom teams on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const allFixtures = await db.fixtures.toArray();
      const allPredictions = await db.predictions.toArray();

      setFixtures(
        allFixtures.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        ),
      );
      setPredictions(allPredictions);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddFixture = async (
    homeTeam: string,
    awayTeam: string,
    date: string,
  ) => {
    try {
      const newFixture: Fixture = {
        id: crypto.randomUUID(),
        homeTeam,
        awayTeam,
        date,
        leagueWeek: leagueWeekInput,
        createdAt: Date.now(),
      };

      await db.fixtures.add(newFixture);
      setFixtures(
        [...fixtures, newFixture].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        ),
      );
      alert("Fixture added successfully!");
    } catch (error) {
      console.error("Error adding fixture:", error);
      alert("Failed to add fixture");
    }
  };

  const handleAddPredictions = async (
    predictionsList: Array<{
      fixtureId: string;
      prediction: "home" | "draw" | "away";
    }>,
  ) => {
    try {
      const userId = (
        document.querySelector(
          'input[placeholder="Enter your name"]',
        ) as HTMLInputElement
      )?.value;

      if (!userId || !userId.trim()) {
        alert("User name is required");
        return;
      }

      const newPredictions: Prediction[] = predictionsList.map((pred) => ({
        id: crypto.randomUUID(),
        fixtureId: pred.fixtureId,
        userId: userId.trim(),
        prediction: pred.prediction,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }));

      await db.predictions.bulkAdd(newPredictions);
      setPredictions([...predictions, ...newPredictions]);
      alert(`${newPredictions.length} predictions added successfully!`);

      // Reset form
      const inputs = document.querySelectorAll('input[type="radio"]');
      inputs.forEach((input) => {
        (input as HTMLInputElement).checked = false;
      });
      const userInput = document.querySelector(
        'input[placeholder="Enter your name"]',
      ) as HTMLInputElement;
      if (userInput) userInput.value = "";
    } catch (error) {
      console.error("Error adding predictions:", error);
      alert("Failed to add predictions");
    }
  };

  const handleDeletePrediction = async (predictionId: string) => {
    try {
      await db.predictions.delete(predictionId);
      setPredictions(predictions.filter((p) => p.id !== predictionId));
    } catch (error) {
      console.error("Error deleting prediction:", error);
      alert("Failed to delete prediction");
    }
  };

  const handleUpdateOutcome = async (
    fixtureId: string,
    outcome: "home" | "draw" | "away",
  ) => {
    try {
      const updatedFixture = fixtures.find((f) => f.id === fixtureId);
      if (!updatedFixture) return;

      updatedFixture.actualOutcome = outcome;
      await db.fixtures.update(fixtureId, { actualOutcome: outcome });
      setFixtures([...fixtures]);
      alert("Outcome updated successfully!");
    } catch (error) {
      console.error("Error updating outcome:", error);
      alert("Failed to update outcome");
    }
  };
  const generateRandomPredictions = async () => {
    if (fixtures.length === 0) {
      alert("No fixtures available to generate predictions for.");
      return;
    }

    try {
      // Generate one random username
      const randomNames = [
        "Alex",
        "Jordan",
        "Taylor",
        "Morgan",
        "Casey",
        "Riley",
        "Avery",
        "Quinn",
        "Blake",
        "Cameron",
        "Drew",
        "Finley",
        "Hayden",
        "Jamie",
        "Kendall",
        "Logan",
        "Madison",
        "Noah",
        "Parker",
        "Reese",
        "Sage",
        "Tristan",
        "Val",
        "Willow",
      ];

      const randomUser =
        randomNames[Math.floor(Math.random() * randomNames.length)];
      const predictionOutcomes: ("home" | "draw" | "away")[] = [
        "home",
        "draw",
        "away",
      ];

      // Generate one prediction per fixture for this user
      const newPredictions: Prediction[] = fixtures.map((fixture) => ({
        id: crypto.randomUUID(),
        fixtureId: fixture.id,
        userId: randomUser,
        prediction:
          predictionOutcomes[
            Math.floor(Math.random() * predictionOutcomes.length)
          ],
        createdAt: Date.now() - Math.random() * 86400000, // Random time within last 24 hours
        updatedAt: Date.now(),
      }));

      await db.predictions.bulkAdd(newPredictions);
      setPredictions([...predictions, ...newPredictions]);
      alert(
        `Generated ${newPredictions.length} random predictions for user "${randomUser}" across ${fixtures.length} fixtures!`,
      );
    } catch (error) {
      console.error("Error generating random predictions:", error);
      alert("Failed to generate random predictions");
    }
  };
  const getWeeksWithFixtures = (fixtures: Fixture[]) => {
    const weeks = new Set(fixtures.map((f) => f.leagueWeek));
    return Array.from(weeks).sort((a, b) => a - b);
  };

  const getFixturesForWeek = (week: number) => {
    return fixtures.filter((f) => f.leagueWeek === week);
  };

  const weeks = getWeeksWithFixtures(fixtures);
  const displayFixtures =
    selectedWeek !== null ? getFixturesForWeek(selectedWeek) : fixtures;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Soccer Predictions
          </h1>
          <p className="text-gray-600">
            Make predictions for multiple fixtures. Track predictions from all
            users.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Forms */}
          <div className="space-y-6">
            {/* Add Fixture Section */}
            <div>
              <div className="flex gap-2 mb-4">
                <input
                  type="number"
                  value={leagueWeekInput}
                  onChange={(e) =>
                    setLeagueWeekInput(parseInt(e.target.value) || 1)
                  }
                  min="1"
                  max="38"
                  className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Week"
                />
              </div>
              <FixtureForm
                leagueWeek={leagueWeekInput}
                onAddFixture={handleAddFixture}
              />
            </div>

            {/* Add Predictions Section */}
            <div>
              <PredictionForm
                fixtures={displayFixtures}
                onAddPredictions={handleAddPredictions}
              />
            </div>
          </div>

          {/* Right Column - Statistics and Filters */}
          <div className="space-y-6">
            {/* Statistics Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Total Fixtures</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {fixtures.length}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">
                    Total Predictions
                  </p>
                  <p className="text-3xl font-bold text-purple-600">
                    {predictions.length}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Active Weeks</p>
                  <p className="text-3xl font-bold text-green-600">
                    {weeks.length}
                  </p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">
                    Unique Predictors
                  </p>
                  <p className="text-3xl font-bold text-orange-600">
                    {new Set(predictions.map((p) => p.userId)).size}
                  </p>
                </div>
              </div>
            </div>

            {/* Simulation Tools */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Simulation Tools</h3>
              <div className="space-y-3">
                <button
                  onClick={generateRandomPredictions}
                  disabled={fixtures.length === 0}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition ${
                    fixtures.length === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700 text-white"
                  }`}
                >
                  🎲 Generate Random Predictions
                </button>
                <p className="text-sm text-gray-600">
                  Creates 3-8 random predictions per fixture with random users.
                  Useful for testing and demonstration.
                </p>
              </div>
            </div>

            {/* Week Filter */}
            {weeks.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Filter by Week</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedWeek(null)}
                    className={`w-full text-left px-4 py-2 rounded-lg font-medium transition ${
                      selectedWeek === null
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    All Weeks
                  </button>
                  {weeks.map((week) => (
                    <button
                      key={week}
                      onClick={() => setSelectedWeek(week)}
                      className={`w-full text-left px-4 py-2 rounded-lg font-medium transition ${
                        selectedWeek === week
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Week {week} ({getFixturesForWeek(week).length} fixtures)
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Predictions List - Full Width */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <PredictionList
            fixtures={displayFixtures}
            predictions={predictions}
            onDeletePrediction={handleDeletePrediction}
            onUpdateOutcome={handleUpdateOutcome}
          />
        </div>
      </div>
    </div>
  );
}
