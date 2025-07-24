import getImdb from "@/app/lib/getImdb";
import getRottenTomatoes from "@/app/lib/getRottenTomatoes";
import { get } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";

type ResponseData = {
    message: string;
    data?: any;
};

export const config = {
    api: {
        bodyParser: true,
    },
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method !== "GET") {
        res.status(400).json({ message: "Try GET method!" });
        return;
    }

    const data = req.query;

    if (!data.filename) {
        res.status(400).json({ message: "Missing 'filename' parameter." });
        return;
    }

    if (!data.source){
        res.status(400).json({ message: "Missing 'source' parameter." });
        return;
    }
    
    if(data.source !== "imdb" && data.source !== "rottentomatoes") {
        res.status(400).json({ message: "Invalid 'source' parameter. Use 'imdb' or 'rottentomatoes'." });
        return;
    }

    const filename = data.filename as string;

    const score = data.source === "imdb" ? await getImdb(filename) : await getRottenTomatoes(filename);

    res.status(200).json({ message: "Success", data: score });

    // const browser = await puppeteer.launch({
    //     headless: false,
    //     defaultViewport: null,
    // })

    // const page = await browser.newPage();

    // await page.goto(`https://www.rottentomatoes.com/search?search=${filename.replaceAll(' ', '%20')}`, {
    //     waitUntil: "domcontentloaded",
    // })

    // const results = await page.evaluate(async () => {
    //     const result = document.querySelector("search-page-media-row");

    //     if (!result) {
    //         res.status(404).send({ message: "❌ - NOT" });
    //         return "";
    //     }
    //     const url = (result.childNodes[1] as HTMLAnchorElement).href || ""

    //     return url || ""; 
    // })

    // await page.goto(results, {
    //     waitUntil: "domcontentloaded",
    // })

    // const link = await page.evaluate(() => {
    //     const score = (document.querySelector('[slot="criticsScore"]')?.childNodes[0] as unknown as string) || "";

    //     console.log(document.querySelector('[slot="criticsScore"]'))
    //     return score; 
    // })

    // if(link.length) res.status(200).send({ message: link });

    res.status(404).send({ message: "❌ - Invalid Credentials" });

}
