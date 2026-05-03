export type Odds = {
  H: number;
  D: number;
  A: number;
};

export const CHOICES = ["H", "D", "A"] as const;
export type Choice = (typeof CHOICES)[number];

export function convertInputToProbabilities(odds: Odds): Odds {
  const values = { ...odds };

  if (Object.values(values).some((v) => v <= 0)) {
    throw new Error("Values must be positive");
  }

  if (Object.values(values).some((v) => v > 1)) {
    return {
      H: 1 / values.H,
      D: 1 / values.D,
      A: 1 / values.A,
    };
  }

  return values;
}

export function normalizeOdds(oddsList: Odds[]): Odds[] {
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

export function randomWeightedChoice(odds: Odds): Choice {
  const r = Math.random();
  const cumulative = [odds.H, odds.H + odds.D, odds.H + odds.D + odds.A];

  if (r < cumulative[0]) return "H";
  if (r < cumulative[1]) return "D";
  return "A";
}

export function randomPrediction(oddsList: Odds[]): string {
  return oddsList.map((o) => randomWeightedChoice(o)).join("");
}

export function similarity(a: string, b: string): number {
  return [...a].filter((char, i) => char === b[i]).length;
}

export function oddsLogScore(combo: string, oddsList: Odds[]): number {
  let score = 0;

  for (let i = 0; i < combo.length; i++) {
    const choice = combo[i] as Choice;
    score += Math.log(Math.max(oddsList[i][choice], 1e-12));
  }

  return score;
}

export function generateAllCombinations(n: number): string[] {
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

export function rankCombinations(
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
