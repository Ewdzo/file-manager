import getImdb from "@/app/lib/getImdb";
import getLetterboxd from "@/app/lib/getLetterboxd";
import getRottenTomatoes from "@/app/lib/getRottenTomatoes";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
  data?: { rating: string };
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

  if (!data.source) {
    res.status(400).json({ message: "Missing 'source' parameter." });
    return;
  }

  if (
    data.source !== "imdb" &&
    data.source !== "rottentomatoes" &&
    data.source !== "letterboxd"
  ) {
    res
      .status(400)
      .json({
        message: "Invalid 'source' parameter. Use 'imdb' or 'rottentomatoes'.",
      });
    return;
  }

  const filename = data.filename as string;
  const score =
    data.source === "imdb"
      ? await getImdb(filename)
      : data.source === "letterboxd"
      ? await getLetterboxd(filename)
      : await getRottenTomatoes(filename);

  // const pdfData = await getPdf("oi");
  // console.log(pdfData);

  res.status(200).json({ message: "Success", data: score });
  res.status(404).send({ message: "❌ - Invalid Credentials" });
}
