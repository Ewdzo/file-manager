import puppeteer from "puppeteer";

export default async function getRottenTomatoes(title: string) {
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

        await page.goto(`https://www.rottentomatoes.com/search?search=${encodeURIComponent(title)}`, {
            waitUntil: "domcontentloaded",
            // timeout: 30000,
        });


        //Obter o link do primeiro resultado
        const results = await page.evaluate(() => {
            const result = document.querySelector("search-page-media-row");
            if (!result) {
                console.log("❌ - NOT")
                return "";
            }
            const url = (result.childNodes[1] as HTMLAnchorElement).href || ""
            return url || "";
        })

        await page.goto(results, {
            waitUntil: "domcontentloaded",
            timeout: 30000
        })

        const rating = await page.evaluate(() => {
            const score = document.querySelector('[slot="criticsScore"]')!.childNodes[0].textContent

            return score;
        })

        if (!rating) {
            return { rating: "Rating not found" };
        }

        return { rating: rating };


    } catch (error) {
        console.error("Scraping error:", error);
    }
}