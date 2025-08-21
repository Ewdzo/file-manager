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

        await page.waitForSelector('span.film-title-wrapper');
        const movieLink = await page.evaluate(() => {
            const result = document.querySelector('.film-title-wrapper')

            if (!result) {
                console.log("❌ - NOT")
                return "";
            }

            const url = (result.children[0] as HTMLAnchorElement).href || ""

            return url || "";
        })

        console.log("Movie Link:", movieLink);
        
        await page.goto(movieLink, {
            waitUntil: "domcontentloaded",
            timeout: 30000
        })

        //extraindo os critics
        await page.waitForSelector('span.average-rating');
        const critics = await page.evaluate(() => {
            const reviews = [...document.querySelectorAll(".production-viewing.-viewing.js-production-viewing")].slice(0, 3);
            const critics: {user: String; critic: String; rating: String}[] = []

            reviews.forEach(el => {
                const user = el.querySelector(".displayname")?.textContent || '';
                const critic = el.querySelector("p")?.textContent || '';
                const stars = el.querySelector(".rating.-green")?.textContent || '';

                let rating = '0';

                if(stars.length != 0) {
                    let count = 0.0;
                    for (let i = 0; i < stars.length; i++) {
                        if (stars[i] === '★') {
                            count = count + 1;
                        }
                        else if(stars[i] === '½') {
                            count = count + .5;
                        }
                    }
                    rating = String(count);
                }

                critics.push({user: user, critic: critic, rating: rating});
            });

            return critics;
        })

        //console.log(JSON.stringify(critics, null, 2));

        return critics;

    } catch (error) {
        console.error("Scraping error:", error);
    }
}