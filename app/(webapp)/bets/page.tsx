"use client";

import { useState } from "react";

type Odds = {
  H: number;
  D: number;
  A: number;
};

const CHOICES = ["H", "D", "A"] as const;
type Choice = (typeof CHOICES)[number];

// ---------------- Utility Functions ----------------

function convertInputToProbabilities(odds: Odds): Odds {
  const values = { ...odds };

  if (Object.values(values).some((v) => v <= 0)) {
    throw new Error("Values must be positive");
  }

  // If any > 1 → assume bookmaker odds
  if (Object.values(values).some((v) => v > 1)) {
    return {
      H: 1 / values.H,
      D: 1 / values.D,
      A: 1 / values.A,
    };
  }

  return values;
}

function normalizeOdds(oddsList: Odds[]): Odds[] {
  return oddsList.map((odds) => {
    const probs = convertInputToProbabilities(odds);
    const total = probs.H + probs.D + probs.A;

    return {
      H: probs.H / total,
      D: probs.D / total,
      A: probs.A / total,
    };
  });
}

function randomWeightedChoice(odds: Odds): Choice {
  const r = Math.random();
  const cumulative = [odds.H, odds.H + odds.D, odds.H + odds.D + odds.A];

  if (r < cumulative[0]) return "H";
  if (r < cumulative[1]) return "D";
  return "A";
}

function randomPrediction(oddsList: Odds[]): string {
  return oddsList.map((o) => randomWeightedChoice(o)).join("");
}

function similarity(a: string, b: string): number {
  return [...a].filter((char, i) => char === b[i]).length;
}

function oddsLogScore(combo: string, oddsList: Odds[]): number {
  let score = 0;

  for (let i = 0; i < combo.length; i++) {
    const choice = combo[i] as Choice;
    score += Math.log(Math.max(oddsList[i][choice], 1e-12));
  }

  return score;
}

function generateAllCombinations(n: number): string[] {
  const results: string[] = [];

  function helper(current: string) {
    if (current.length === n) {
      results.push(current);
      return;
    }

    for (const c of CHOICES) {
      helper(current + c);
    }
  }

  helper("");
  return results;
}

function rankCombinations(
  oddsList: Odds[],
  base: string,
  topN: number,
): string[] {
  const allCombos = generateAllCombinations(oddsList.length);

  const logScores = allCombos.map((c) => oddsLogScore(c, oddsList));

  const min = Math.min(...logScores);
  const max = Math.max(...logScores);
  const range = max - min || 1;

  const intelligenceWeight = Math.random() * (0.8 - 0.4) + 0.4;

  const scored = allCombos.map((combo, i) => {
    const sim = similarity(combo, base);
    const normalized = (logScores[i] - min) / range;

    const finalScore =
      sim * intelligenceWeight + normalized * (1 - intelligenceWeight);

    return { combo, score: finalScore };
  });

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, topN).map((s) => s.combo);
}

// ---------------- UI ----------------

export default function Page() {
  const [oddsList, setOddsList] = useState<Odds[]>([
    { H: 2.0, D: 3.2, A: 3.5 },
  ]);

  const [topN, setTopN] = useState(30);
  const [results, setResults] = useState<string[]>([]);
  const [randomPred, setRandomPred] = useState("");
  const [basePred, setBasePred] = useState("");

  const addMatch = () => {
    setOddsList([...oddsList, { H: 2, D: 3, A: 4 }]);
  };

  const updateOdds = (index: number, key: keyof Odds, value: number) => {
    const updated = [...oddsList];
    updated[index][key] = value;
    setOddsList(updated);
  };

  const generate = () => {
    try {
      const normalized = normalizeOdds(oddsList);

      const randomP = randomPrediction(normalized);
      const base = randomPrediction(normalized);

      const ranked = rankCombinations(normalized, base, topN);

      setRandomPred(randomP);
      setBasePred(base);
      setResults(ranked);
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Betting Combination Generator</h1>

      {/* Odds Input */}
      {oddsList.map((odds, i) => (
        <div key={i} className="flex gap-2">
          <span>Match {i + 1}</span>
          {(["H", "D", "A"] as (keyof Odds)[]).map((k) => (
            <input
              key={k}
              type="number"
              step="0.01"
              value={odds[k]}
              onChange={(e) => updateOdds(i, k, parseFloat(e.target.value))}
              className="border p-1 w-20"
            />
          ))}
        </div>
      ))}

      <button
        onClick={addMatch}
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        Add Match
      </button>

      {/* Top N */}
      <div>
        <label>Number of combinations: </label>
        <input
          type="number"
          value={topN}
          onChange={(e) => setTopN(parseInt(e.target.value))}
          className="border p-1 w-20"
        />
      </div>

      <button
        onClick={generate}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Generate
      </button>

      {/* Results */}
      {results.length > 0 && (
        <div>
          <p>
            <strong>Random Prediction:</strong> {randomPred}
          </p>
          <p>
            <strong>Base Pattern:</strong> {basePred}
          </p>

          <h2 className="mt-4 font-bold">Top Combinations</h2>
          <ul className="grid grid-cols-3 gap-2">
            {results.map((r, i) => (
              <li key={i} className="border p-1 text-center">
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
