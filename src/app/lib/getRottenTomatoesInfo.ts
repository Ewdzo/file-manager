import puppeteer from "puppeteer";

export default async function getRottenTomatosInfo(title: string) {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null,
    });

    const page = await browser.newPage();

    // Primeira etapa: buscar o filme
    await page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.5",
    });

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/"
    );

    await page.goto(
      `https://www.rottentomatoes.com/search?search=${encodeURIComponent(
        title
      )}`,
      {
        waitUntil: "domcontentloaded",
        // timeout: 30000,
      }
    );

    //Obter o link do primeiro resultado
    const results = await page.evaluate(() => {
      const result = document.querySelector("search-page-media-row");
      if (!result) {
        console.log("❌ - NOT");
        return "";
      }
      const url = (result.childNodes[1] as HTMLAnchorElement).href || "";
      return url || "";
    });

    await page.goto(results + "/reviews", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    // Extrair critica
    await page.waitForSelector(".review-row");
    const critics = await page.evaluate(() => {
      const reviews = [...document.querySelectorAll(".review-row")].slice(0, 3);
      const critics: { user: string; critic: string }[] = [];

      reviews.forEach((el) => {
        const user =
          el
            .querySelector(".display-name")
            ?.textContent.trim()
            .replace("\n", "") || "";
        const critic = el.querySelector(".review-text")?.textContent || "";

        critics.push({ user: user, critic: critic });
      });

      return critics;
    });
    //console.log(JSON.stringify(critics, null, 2));

    return { critics: critics };
  } catch (error) {
    console.error("Scraping error:", error);
  }
}
