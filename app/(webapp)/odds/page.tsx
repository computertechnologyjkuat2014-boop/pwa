import puppeteer from "puppeteer";
import { db } from "@/lib/db";

export async function POST() {
  let browser;

  try {
    browser = await puppeteer.launch({});

    const page = await browser.newPage();

    await page.goto("https://www.sportpesa.com/", {
      waitUntil: "networkidle2",
    });

    // Wait for odds to load (adjust selector)
    await page.waitForSelector(".event-row");

    const oddsData = await page.evaluate(() => {
      const rows = document.querySelectorAll(".event-row");

      return Array.from(rows).map((row) => {
        const teams =
          row.querySelector(".teams")?.textContent?.split(" vs ") || [];
        const odds = row.querySelectorAll(".odds span");

        return {
          homeTeam: teams[0]?.trim(),
          awayTeam: teams[1]?.trim(),
          homeOdds: odds[0]?.textContent,
          drawOdds: odds[1]?.textContent,
          awayOdds: odds[2]?.textContent,
          league: row.querySelector(".league")?.textContent,
        };
      });
    });

    // Save to DB
    const now = Date.now();

    await db.odds.bulkAdd(
      oddsData.map((odd: any) => ({
        ...odd,
        bookmaker: "SportPesa",
        crawledAt: now,
      })),
    );

    return Response.json({ success: true, count: oddsData.length });
  } catch (error) {
    console.error(error);
    return new Response("Failed", { status: 500 });
  } finally {
    if (browser) await browser.close();
  }
}
