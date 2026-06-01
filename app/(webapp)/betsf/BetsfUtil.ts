import { TicketResult } from "@/types/ticket";

const DOUBLE_MAP: Record<string, string[]> = {
  H: ["HD", "AD"],
  A: ["AD", "HD"],
};

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

function product<T>(arrays: T[][]): T[][] {
  return arrays.reduce<T[][]>(
    (acc, curr) =>
      acc.flatMap((x) => curr.map((y) => [...x, y])),
    [[]]
  );
}

function combinations(
  arr: number[],
  k: number
): number[][] {
  const result: number[][] = [];

  function helper(
    start: number,
    combo: number[]
  ) {
    if (combo.length === k) {
      result.push([...combo]);
      return;
    }

    for (let i = start; i < arr.length; i++) {
      combo.push(arr[i]);
      helper(i + 1, combo);
      combo.pop();
    }
  }

  helper(0, []);

  return result;
}

function expandTicket(ticket: string[]) {
  const choices = ticket.map((item) =>
    item.length === 2 ? item.split("") : [item]
  );

  return product(choices).map((x) => x.join(""));
}

function ticketString(ticket: string[]) {
  return ticket
    .map((x) => (x.length === 2 ? x[0] : x))
    .join("");
}

function similarity(a: string, b: string) {
  return [...a].filter(
    (char, idx) => char === b[idx]
  ).length;
}

export function generateTickets(
  singlePrediction: string,
  numDoubles = 3,
  simDiffs = 1,
  maxTickets = 2000,
  randomness = 10
) {
  const tickets: TicketResult[] = [];

  const coveredTracker: Record<string, number> =
    {};

  const positionsCombos = shuffle(
    combinations(
      [...Array(singlePrediction.length).keys()],
      numDoubles
    )
  );

  for (const positions of positionsCombos) {
    const options = positions.map(
      (i) => DOUBLE_MAP[singlePrediction[i]]
    );

    const doubleChoiceList = shuffle(
      product(options)
    );

    for (const doubleChoices of doubleChoiceList) {
      const ticket = [...singlePrediction];

      positions.forEach((pos, idx) => {
        ticket[pos] = doubleChoices[idx];
      });

      const covered = expandTicket(ticket);

      let repetitionScore = covered.reduce(
        (sum, c) => sum + (coveredTracker[c] || 0),
        0
      );

      repetitionScore += Math.floor(
        Math.random() * (randomness + 1)
      );

      tickets.push({
        ticket,
        covered,
        score: repetitionScore,
      });
    }
  }

  tickets.sort(
    (a, b) =>
      a.score - b.score ||
      Math.random() - 0.5
  );

  const selected: TicketResult[] = [];

  for (const item of tickets) {
    const currentStr = ticketString(item.ticket);

    const tooSimilar = selected.some((s) => {
      const selectedStr = ticketString(
        s.ticket
      );

      return (
        similarity(currentStr, selectedStr) >=
        singlePrediction.length - simDiffs
      );
    });

    if (tooSimilar) continue;

    selected.push(item);

    item.covered.forEach((c) => {
      coveredTracker[c] =
        (coveredTracker[c] || 0) + 1;
    });

    if (selected.length >= maxTickets) {
      break;
    }
  }

  return shuffle(selected);
}