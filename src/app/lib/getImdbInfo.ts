import puppeteer from "puppeteer";

export default async function getImdbInfo(title: string) {
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

        // Extrair diretor
        const director = await page.evaluate(() => {
            const directorSelectors = '[class="ipc-metadata-list-item__list-content-item ipc-metadata-list-item__list-content-item--link"]';
            const textContent = document.querySelector(directorSelectors)?.textContent;

            return textContent ? textContent.trim() : null;
        });

        if (!director) {
            return { director: "Director not found" };
        }

        // Extrair casting
        const casting = await page.evaluate(() => {
            const castingSelectors = '[class="ipc-inline-list ipc-inline-list--show-dividers ipc-inline-list--inline ipc-metadata-list-item__list-content baseAlt"]';
            const listItems = document.querySelectorAll(`${castingSelectors} li `);
            console.log("Casting List Items:", listItems);
            const cast = Array.from(listItems).map(item => item.textContent?.trim()).filter(Boolean);
            return cast.length > 0 ? cast.slice(-3) : null;
        });

        if (!casting) {
            return { casting: "Casting not found" };
        }

        return { casting: casting, director: director };

    } catch (error) {
        console.error("Scraping error:", error);
    }
}