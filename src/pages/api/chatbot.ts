import scrapePdf from "@/app/libs/pdfscraping";
import { MemoryService } from "@/app/services/memoryService";
import type { NextApiRequest, NextApiResponse } from "next";

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

  //   if (!data.file) {
  //     res.status(400).json({ message: "Missing 'file' parameter." });
  //     return;
  //   }

  if (!data.query) {
    res.status(400).json({ message: "Missing 'file' parameter." });
    return;
  }

  try {
    const path = data.file as string;

    const file = await scrapePdf(path);
    if (!file) {
      res.status(500).json({ message: "PDF Scraping failed!" });
      return;
    }
    const pages = file.pages.map((page) => {
      return { content: page.content.map((c) => c.str) };
    });
    const content = JSON.stringify(pages);

    const memoryService = new MemoryService();
    await memoryService.storeMemory(content);
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
