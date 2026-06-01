"use client";

import { useState } from "react";
import { generateTickets } from "./BetsfUtil";
import { TicketResult } from "@/types/ticket";

export default function Page() {
  const [singlePrediction, setSinglePrediction] = useState("HAHH");
  const [numDoubles, setNumDoubles] = useState(3);
  const [simDiffs, setSimDiffs] = useState(1);
  const [maxTickets, setMaxTickets] = useState(2000);
  const [randomness, setRandomness] = useState(10);
  const [results, setResults] = useState<TicketResult[]>([]);
  const [error, setError] = useState("");

  const generate = () => {
    const prediction = singlePrediction.trim().toUpperCase();

    if (!prediction || !/^[HDA]+$/.test(prediction)) {
      setError("Prediction must only contain H, D, and A characters.");
      return;
    }

    if (numDoubles < 0 || numDoubles > prediction.length) {
      setError("Number of doubles must be between 0 and the prediction length.");
      return;
    }

    if (simDiffs < 0 || simDiffs >= prediction.length) {
      setError("Similarity difference must be between 0 and prediction length - 1.");
      return;
    }

    if (maxTickets < 1) {
      setError("Max tickets must be at least 1.");
      return;
    }

    if (randomness < 0) {
      setError("Randomness must be 0 or greater.");
      return;
    }

    setError("");
    const generated = generateTickets(prediction, numDoubles, simDiffs, maxTickets, randomness);
    setResults(generated);
  };

  const copyJson = async () => {
    if (results.length === 0) {
      return;
    }

    await navigator.clipboard.writeText(JSON.stringify(results, null, 2));
    alert("Results copied to clipboard.");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Double Chance Ticket Generator</h1>
      <p className="text-sm text-slate-600">
        Based on the Python implementation in `testb.py`, this page generates double chance ticket combinations with diversity filtering.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="font-semibold">Single Prediction</span>
          <input
            value={singlePrediction}
            onChange={(e) => setSinglePrediction(e.target.value)}
            className="border p-2 w-full"
            placeholder="Example: HAHH"
          />
        </label>

        <label className="space-y-2">
          <span className="font-semibold">Number of Doubles</span>
          <input
            type="number"
            value={numDoubles}
            min={0}
            max={singlePrediction.length}
            onChange={(e) => setNumDoubles(parseInt(e.target.value, 10))}
            className="border p-2 w-full"
          />
        </label>

        <label className="space-y-2">
          <span className="font-semibold">Similarity Difference</span>
          <input
            type="number"
            value={simDiffs}
            min={0}
            max={Math.max(0, singlePrediction.length - 1)}
            onChange={(e) => setSimDiffs(parseInt(e.target.value, 10))}
            className="border p-2 w-full"
          />
        </label>

        <label className="space-y-2">
          <span className="font-semibold">Randomness</span>
          <input
            type="number"
            value={randomness}
            min={0}
            onChange={(e) => setRandomness(parseInt(e.target.value, 10))}
            className="border p-2 w-full"
          />
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="font-semibold">Max Tickets</span>
          <input
            type="number"
            value={maxTickets}
            min={1}
            onChange={(e) => setMaxTickets(parseInt(e.target.value, 10))}
            className="border p-2 w-full"
          />
        </label>
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}

      <div className="flex flex-wrap gap-3">
        <button
          onClick={generate}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Generate Tickets
        </button>
        <button
          onClick={copyJson}
          disabled={results.length === 0}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Copy JSON
        </button>
      </div>

      {results.length > 0 && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="rounded border bg-slate-50 px-4 py-3">
              <strong>{results.length}</strong> ticket results
            </div>
            <div className="rounded border bg-slate-50 px-4 py-3">
              Prediction: <strong>{singlePrediction.toUpperCase()}</strong>
            </div>
          </div>

          <div className="grid gap-4">
            {results.map((item, index) => (
              <div
                key={`${item.ticket.join("-")}-${index}`}
                className="border rounded-lg p-4 bg-white shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold">Ticket {index + 1}</div>
                    <div className="text-sm text-slate-600">
                      Score: {item.score} / Covered: {item.covered.length}
                    </div>
                  </div>
                  <div className="text-right text-sm text-slate-500">
                    {item.ticket.join(" ")}
                  </div>
                </div>
                <div className="mt-3 text-sm text-slate-700">
                  Covered singles: {item.covered.join(", ")}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
