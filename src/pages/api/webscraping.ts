import getImdb from "@/app/lib/getImdb";
import getRottenTomatoes from "@/app/lib/getRottenTomatoes";
import getLetterboxd from "@/app/lib/getLetterboxd";
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
    
    if(data.source !== "imdb" && data.source !== "rottentomatoes" && data.source !== "letterboxd") {
        res.status(400).json({ message: "Invalid 'source' parameter. Use 'imdb' or 'rottentomatoes'." });
        return;
    }

    const filename = data.filename as string;

    const score = data.source === "imdb" ? await getImdb(filename) : 
    data.source === "letterboxd" ? await getLetterboxd(filename) : 
    await getRottenTomatoes(filename);

    res.status(200).json({ message: "Success", data: score });
    res.status(404).send({ message: "❌ - Invalid Credentials" });
}
