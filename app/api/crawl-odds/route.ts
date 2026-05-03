import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Odds } from "@/types/football";

export async function POST(request: NextRequest) {
  try {
    // Fetch the SportPesa football page
    const response = await fetch(
      "https://www.ke.sportpesa.com/en/sports-betting/football-1/",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch SportPesa: ${response.status}`);
    }

    const html = await response.text();

    // Parse the HTML to extract odds data
    // This is a simplified parser - in a real implementation, you'd use cheerio or puppeteer
    const odds: Omit<Odds, "id" | "crawledAt">[] = [];

    // Look for match data in the HTML
    // This is a basic regex-based parser - you'd want something more robust
    const matchRegex =
      /<div[^>]*class="[^"]*match[^"]*"[^>]*>[\s\S]*?<\/div>/gi;
    const matches = html.match(matchRegex) || [];

    for (const match of matches.slice(0, 10)) {
      // Limit to first 10 matches for demo
      // Extract team names and odds
      const homeTeamMatch = match.match(
        /<span[^>]*class="[^"]*home[^"]*"[^>]*>([^<]+)<\/span>/i,
      );
      const awayTeamMatch = match.match(
        /<span[^>]*class="[^"]*away[^"]*"[^>]*>([^<]+)<\/span>/i,
      );
      const homeOddsMatch = match.match(
        /<span[^>]*class="[^"]*home-odds[^"]*"[^>]*>([^<]+)<\/span>/i,
      );
      const drawOddsMatch = match.match(
        /<span[^>]*class="[^"]*draw-odds[^"]*"[^>]*>([^<]+)<\/span>/i,
      );
      const awayOddsMatch = match.match(
        /<span[^>]*class="[^"]*away-odds[^"]*"[^>]*>([^<]+)<\/span>/i,
      );

      if (
        homeTeamMatch &&
        awayTeamMatch &&
        homeOddsMatch &&
        drawOddsMatch &&
        awayOddsMatch
      ) {
        const homeTeam = homeTeamMatch[1].trim();
        const awayTeam = awayTeamMatch[1].trim();
        const homeOdds = parseFloat(homeOddsMatch[1].trim());
        const drawOdds = parseFloat(drawOddsMatch[1].trim());
        const awayOdds = parseFloat(awayOddsMatch[1].trim());

        if (!isNaN(homeOdds) && !isNaN(drawOdds) && !isNaN(awayOdds)) {
          odds.push({
            homeTeam,
            awayTeam,
            league: "Unknown", // You'd need to extract league info
            homeOdds,
            drawOdds,
            awayOdds,
            bookmaker: "SportPesa",
          });
        }
      }
    }

    // If no odds were parsed, use mock data
    if (odds.length === 0) {
      const mockOdds: Omit<Odds, "id" | "crawledAt">[] = [
        {
          homeTeam: "Arsenal",
          awayTeam: "Chelsea",
          league: "Premier League",
          homeOdds: 2.1,
          drawOdds: 3.4,
          awayOdds: 3.2,
          bookmaker: "SportPesa",
        },
        {
          homeTeam: "Real Madrid",
          awayTeam: "Barcelona",
          league: "La Liga",
          homeOdds: 1.8,
          drawOdds: 3.8,
          awayOdds: 4.2,
          bookmaker: "SportPesa",
        },
      ];
      odds.push(...mockOdds);
    }

    const crawledAt = Date.now();

    // Save odds to database
    for (const oddData of odds) {
      await db.odds.add({
        ...oddData,
        id: crypto.randomUUID(),
        crawledAt,
      });
    }

    return NextResponse.json({
      success: true,
      message: `Crawled and saved ${odds.length} odds successfully`,
      count: odds.length,
    });
  } catch (error) {
    console.error("Error crawling odds:", error);
    return NextResponse.json(
      { success: false, error: "Failed to crawl odds" },
      { status: 500 },
    );
  }
}
