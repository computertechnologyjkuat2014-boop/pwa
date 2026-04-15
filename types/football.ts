// types/football.ts
export interface Game {
  id: string;
  homeTeam: string;
  awayTeam: string;
  matchday: number;
  date?: string; // Optional date for the game
  predictedOutcome?: "home" | "draw" | "away"; // Prediction for the game outcome
  actualOutcome?: "home" | "draw" | "away"; // Actual outcome after the game
}

// EPL Teams (as of 2023/24 season, can be updated)
export const EPL_TEAMS = [
  "Arsenal",
  "Aston Villa",
  "Bournemouth",
  "Brentford",
  "Brighton & Hove Albion",
  "Burnley",
  "Chelsea",
  "Crystal Palace",
  "Everton",
  "Fulham",
  "Liverpool",
  "Leeds United",
  "Manchester City",
  "Manchester United",
  "Newcastle United",
  "Nottingham Forest",
  "Sunderland",
  "Tottenham Hotspur",
  "West Ham United",
  "Wolverhampton Wanderers",
];
