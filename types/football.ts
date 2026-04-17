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

export interface Fixture {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  leagueWeek: number;
  createdAt: number;
  actualOutcome?: "home" | "draw" | "away"; // Actual match outcome
}

export interface Prediction {
  id: string;
  fixtureId: string;
  userId: string; // Username or user identifier
  prediction: "home" | "draw" | "away"; // Predicted outcome
  createdAt: number;
  updatedAt: number;
}

// EPL Teams (as of 2023/24 season)
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

// La Liga Teams
export const LA_LIGA_TEAMS = [
  "Real Madrid",
  "Barcelona",
  "Atlético Madrid",
  "Real Sociedad",
  "Athletic Club",
  "Sevilla",
  "Villarreal",
  "Real Betis",
  "Getafe",
  "Rayo Vallecano",
  "Osasuna",
  "Las Palmas",
  "Cádiz",
  "Mallorca",
  "Girona",
  "Celta Vigo",
  "Valencia",
  "Alavés",
];

// Ligue 1 Teams
export const LIGUE_1_TEAMS = [
  "Paris Saint-Germain",
  "AS Monaco",
  "Marseille",
  "Lyon",
  "Lens",
  "Nice",
  "Rennes",
  "Toulouse",
  "Strasbourg",
  "Nantes",
  "Brest",
  "Saint-Étienne",
  "Bordeaux",
  "Le Havre",
  "Angers",
  "Reims",
  "Montpellier",
  "Lorient",
  "Stade Brestois 29",
  "Metz",
  "Paris FC",
];

// Serie A Teams
export const SERIE_A_TEAMS = [
  "Juventus",
  "Inter Milan",
  "AC Milan",
  "Napoli",
  "AS Roma",
  "Lazio",
  "Atalanta",
  "Fiorentina",
  "Bologna",
  "Torino",
  "Sassuolo",
  "Udinese",
  "Parma",
  "Pisa",
  "Lecce",
  "Empoli",
  "Frosinone",
  "US Cremonese",
  "Genoa",
];

// Bundesliga Teams
export const BUNDESLIGA_TEAMS = [
  "Bayern Munich",
  "Borussia Dortmund",
  "RB Leipzig",
  "Bayer Leverkusen",
  "Borussia Mönchengladbach",
  "Eintracht Frankfurt",
  "VfL Wolfsburg",
  "Werder Bremen",
  "FC Augsburg",
  "TSG Hoffenheim",
  "SC Freiburg",
  "1. FC Köln",
  "1. FC Union Berlin",
  "VfB Stuttgart",
  "Hertha BSC",
  "FSV Mainz 05",
  "Greuther Fürth",
  "Schalke 04",
];

// Belgian Pro League Teams
export const BELGIAN_PRO_TEAMS = [
  "Club Brugge",
  "RSC Anderlecht",
  "Standard Liège",
  "KRC Genk",
  "Royale Union Saint-Gilloise",
  "KAA Gent",
  "RSC Charleroi",
  "Cercle Brugge",
  "KV Mechelen",
  "KV Kortrijk",
  "KRC Westerlo",
  "Sint-Truidense V.V.",
  "K.V. Oostende",
  "KAS Eupen",
  "OH Leuven",
  "Royal Antwerp",
  "Westerlo",
  "KVC Westerlo",
  "RAAL La Louvière",
  "SV Zulte Waregem",
];

// other leagues and teams can be added similarly
export const OTHER_TEAMS = [
  "Carrarese Calcio",
  " Delfino Pescara",
  "Albacete Balompié",
  "Granada CF",
  "AZ Alkmaar",
  "NEC Nijmegen",
  "AEK Athens",
  "PAOK Thessaloniki",
  "FC Petrolul Ploiești",
  "AFC Hermannstadt",
  "Port Vale",
  " Wigan Athletic",
];
export const LEAGUES = {
  EPL: "Premier League",
  LALIGA: "La Liga",
  LIGUE1: "Ligue 1",
  SERIEA: "Serie A",
  BUNDESLIGA: "Bundesliga",
  BELGIUM: "Belgian Pro League",
  OTHER: "Other",
};

export const ALL_TEAMS = {
  [LEAGUES.EPL]: EPL_TEAMS,
  [LEAGUES.LALIGA]: LA_LIGA_TEAMS,
  [LEAGUES.LIGUE1]: LIGUE_1_TEAMS,
  [LEAGUES.SERIEA]: SERIE_A_TEAMS,
  [LEAGUES.BUNDESLIGA]: BUNDESLIGA_TEAMS,
  [LEAGUES.BELGIUM]: BELGIAN_PRO_TEAMS,
  [LEAGUES.OTHER]: OTHER_TEAMS,
};
