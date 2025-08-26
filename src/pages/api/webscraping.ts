import getImdbInfo from "@/app/lib/getImdbInfo";
import getImdbRating from "@/app/lib/getImdbRating";
import getLetterboxd from "@/app/lib/getLetterboxd";
import getLetterboxdCritics from "@/app/lib/getLetterboxdCritics";
import getRottenTomatoes from "@/app/lib/getRottenTomatoes";
import getRottenTomatoesInfo from "@/app/lib/getRottenTomatoesInfo";
import type { NextApiRequest, NextApiResponse } from "next";

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

  if (!data.source) {
    res.status(400).json({ message: "Missing 'source' parameter." });
    return;
  }

  if (!data.type) {
    res.status(400).json({ message: "Missing 'type' parameter." });
    return;
  }

  if (data.type != "rating" && data.type != "info") {
    res.status(400).json({ message: "Parameter'type' must be rating or info." });
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

  if (data.type == "rating") {
    const filename = data.filename as string;
    const score =
      data.source === "imdb"
        ? await getImdbRating(filename)
        : data.source === "letterboxd"
          ? await getLetterboxd(filename)
          : await getRottenTomatoes(filename);

    res.status(200).json({ message: "Success", data: score });
  }

  if (data.type == "info") {
    const filename = data.filename as string;
    const info =
      data.source === "imdb"
        ? await getImdbInfo(filename)
        : data.source === "letterboxd"
          ? await getLetterboxdCritics(filename)
          : await getRottenTomatoesInfo(filename);

    res.status(200).json({ message: "Success", data: info });
  }

  res.status(404).send({ message: "❌ - Invalid Parameters" });
}
