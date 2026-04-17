"use client";

import { Fixture, Prediction } from "@/types/football";
import ActualOutcomeUpdater from "./ActualOutcomeUpdater";

interface PredictionListProps {
  fixtures: Fixture[];
  predictions: Prediction[];
  onDeletePrediction?: (predictionId: string) => void;
  onUpdateOutcome?: (
    fixtureId: string,
    outcome: "home" | "draw" | "away",
  ) => void;
}

export default function PredictionList({
  fixtures,
  predictions,
  onDeletePrediction,
  onUpdateOutcome,
}: PredictionListProps) {
  // Group predictions by fixture
  const getPredictionsForFixture = (fixtureId: string) => {
    return predictions.filter((p) => p.fixtureId === fixtureId);
  };

  const fixtureMap = new Map(fixtures.map((f) => [f.id, f]));

  const getPredictionDisplay = (
    prediction: "home" | "draw" | "away",
    fixture: Fixture,
  ) => {
    switch (prediction) {
      case "home":
        return fixture.homeTeam;
      case "away":
        return fixture.awayTeam;
      case "draw":
        return "Draw";
      default:
        return "Unknown";
    }
  };

  const isPredictionCorrect = (
    prediction: "home" | "draw" | "away",
    fixture: Fixture,
  ) => {
    if (!fixture.actualOutcome) return null;
    return prediction === fixture.actualOutcome;
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold mb-6">All Predictions</h3>

      {fixtures.length === 0 ? (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center">
          <p className="text-gray-600">No fixtures available</p>
        </div>
      ) : (
        fixtures.map((fixture) => {
          const fixturePredictions = getPredictionsForFixture(fixture.id);

          return (
            <div
              key={fixture.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* Fixture Header */}
              <div
                className={`text-white p-4 ${
                  fixture.actualOutcome
                    ? "bg-gradient-to-r from-green-600 to-green-700"
                    : "bg-gradient-to-r from-blue-600 to-blue-700"
                }`}
              >
                <p className="text-sm opacity-90">Week {fixture.leagueWeek}</p>
                <h4 className="text-lg font-bold">
                  {fixture.homeTeam} vs {fixture.awayTeam}
                </h4>
                <p className="text-sm opacity-90">
                  {new Date(fixture.date).toLocaleDateString()}{" "}
                  {new Date(fixture.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                {fixture.actualOutcome && (
                  <div className="mt-2 pt-2 border-t border-white border-opacity-30">
                    <p className="text-sm font-semibold">
                      Result:{" "}
                      {getPredictionDisplay(fixture.actualOutcome, fixture)}
                    </p>
                  </div>
                )}
              </div>

              {/* Predictions List */}
              <div className="p-4">
                {fixturePredictions.length === 0 ? (
                  <p className="text-gray-500 italic">No predictions yet</p>
                ) : (
                  <div className="space-y-3">
                    {fixturePredictions.map((pred) => {
                      const isCorrect = isPredictionCorrect(
                        pred.prediction,
                        fixture,
                      );

                      return (
                        <div
                          key={pred.id}
                          className={`p-3 rounded-lg flex justify-between items-center transition ${
                            isCorrect === true
                              ? "bg-green-50 border border-green-200"
                              : isCorrect === false
                                ? "bg-red-50 border border-red-200"
                                : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
                          }`}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-gray-800">
                                {pred.userId}
                              </p>
                              {isCorrect === true && (
                                <span className="text-xs bg-green-600 text-white px-2 py-1 rounded font-semibold">
                                  ✓ Correct
                                </span>
                              )}
                              {isCorrect === false && (
                                <span className="text-xs bg-red-600 text-white px-2 py-1 rounded font-semibold">
                                  ✗ Wrong
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-blue-600 font-semibold">
                              Predicts:{" "}
                              {getPredictionDisplay(pred.prediction, fixture)}
                            </p>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-500">
                              {new Date(pred.createdAt).toLocaleDateString()}
                            </span>
                            {onDeletePrediction && (
                              <button
                                onClick={() => onDeletePrediction(pred.id)}
                                className="text-red-600 hover:text-red-800 text-sm font-medium"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Statistics */}
                {fixturePredictions.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-3 gap-2 text-center text-sm">
                      <div className="bg-blue-50 p-2 rounded">
                        <p className="text-xs text-gray-600">Home Picks</p>
                        <p className="font-bold text-blue-600">
                          {
                            fixturePredictions.filter(
                              (p) => p.prediction === "home",
                            ).length
                          }
                        </p>
                      </div>
                      <div className="bg-yellow-50 p-2 rounded">
                        <p className="text-xs text-gray-600">Draws</p>
                        <p className="font-bold text-yellow-600">
                          {
                            fixturePredictions.filter(
                              (p) => p.prediction === "draw",
                            ).length
                          }
                        </p>
                      </div>
                      <div className="bg-red-50 p-2 rounded">
                        <p className="text-xs text-gray-600">Away Picks</p>
                        <p className="font-bold text-red-600">
                          {
                            fixturePredictions.filter(
                              (p) => p.prediction === "away",
                            ).length
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Actual Outcome Updater */}
                {onUpdateOutcome && (
                  <ActualOutcomeUpdater
                    fixture={fixture}
                    onUpdateOutcome={onUpdateOutcome}
                  />
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
