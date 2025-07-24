import puppeteer from "puppeteer";

export default async function getImdb(title: string) {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null,
        });

        const page = await browser.newPage();

        // Primeira etapa: buscar o filme
        await page.setExtraHTTPHeaders({
            'Accept-Language': 'en-US,en;q=0.5'
        })

        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/');

        await page.goto(`https://imdb.com/find/?q=${encodeURIComponent(title)}`, {
            waitUntil: "domcontentloaded",
            timeout: 30000
        });

        // Obter o link do primeiro resultado
        const movieLink = await page.evaluate(() => {
            const resultSelector = '[class="ipc-metadata-list-summary-item ipc-metadata-list-summary-item--click find-result-item find-title-result"]';

            const anchorSelector = '[class="ipc-metadata-list-summary-item__t"]'

            const linkElement = document.querySelector(resultSelector)?.querySelector(anchorSelector);

            return linkElement ? (linkElement as HTMLAnchorElement).href : null;

        });

        if (!movieLink) {
            return { rating: "Movie link not found" };
        }

        console.log("Movie Link:", movieLink);

        await page.setExtraHTTPHeaders({
            'Accept-Language': 'en-US,en;q=0.5'
        })
        await page.goto(movieLink, {
            waitUntil: "domcontentloaded",
            timeout: 30000
        });

        // Extrair apenas o rating
        const rating = await page.evaluate(() => {
            const ratingSelectors = '[class="sc-4dc495c1-1 lbQcRY"]';
            const textContent = document.querySelector(ratingSelectors)?.textContent;

            return textContent ? textContent.trim() : null;
        });

        if (!rating) {
            return { rating: "Rating not found" };
        }

        return { rating: rating + " / 10" };

    } catch (error) {
        console.error("Scraping error:", error);
    }
}