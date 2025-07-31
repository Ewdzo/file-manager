import puppeteer from "puppeteer";

export default async function getLetterboxd(title: string) {
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


        await page.goto(`https://letterboxd.com/search/${encodeURIComponent(title)}`, {
            waitUntil: "domcontentloaded",
            timeout: 30000
        });

        const movieLink = await page.evaluate(() => {
            const result = document.querySelector('.film-title-wrapper')

            if (!result) {
                console.log("❌ - NOT")
                return "";
            }

            const url = (result.children[0] as HTMLAnchorElement).href || ""
            return url || "";
        })

        if (!movieLink) {
            return { rating: "Movie link not found" };
        }

        console.log("Movie Link:", movieLink);

        await page.goto(movieLink, {
            waitUntil: "domcontentloaded",
            timeout: 30000
        })

        //extrair o rating

        const rating = await page.evaluate(() => {
            const score = document.querySelector('.average-rating')?.children[0].textContent

            return score;
        })

        console.log(rating)
        if (!rating) {
            return { rating: "Rating not found" };
        }

        return { rating: rating };


    } catch (error) {
        console.error("Scraping error:", error);
    }

}