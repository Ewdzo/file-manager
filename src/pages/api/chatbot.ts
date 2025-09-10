import scrapePdf from "@/app/lib/pdfscraping";
import { MemoryService } from "@/app/services/memoryService";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";

type ResponseData = {
  message: string;
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

  if (!data.file) {
    res.status(400).json({ message: "Missing 'file' parameter." });
    return;
  }

  if (!data.query) {
    res.status(400).json({ message: "Missing 'query' parameter." });
    return;
  }

  try {
    const filepath = data.file as string;

    const pdfPath = path.join("./public/", filepath);

    const file = await scrapePdf(pdfPath);
    if (!file) {
      res.status(500).json({ message: "PDF Scraping failed!" });
      return;
    }

    const memoryService = new MemoryService();
    await Promise.all(file.pages.map(async (page) => {
      const content = page.content.map((c) => c.str);
      const json = JSON.stringify(content);

      await memoryService.storeMemory(json);
    }));

    const response = await memoryService.getRelevantMemory(
      data.query as string
    );

    res.status(200).json({ message: response });

    return;
  } catch (e) {
    console.log(e);
    res.status(401).json({ message: "Invalid Token" });
    return;
  }
}
