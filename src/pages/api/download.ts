import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import progress_stream from "progress-stream";

type ResponseData = {
  message: string;
};

export const config = {
  api: {
    bodyParser: false,
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

  if (!req.query.name) {
    res.status(400).json({ message: "Missing 'name' parameter." });
    return;
  }

  const fileName = req.query.name as string;

  const filePath = path.join("./files/", fileName);
  const stat = fs.statSync(filePath);


  res.writeHead(200, {
    "Content-Length": stat.size,
    "Content-Disposition": "attachment; filename=" + fileName,
  });

  const readStream = fs.createReadStream(filePath);
  const str = progress_stream(
    { time: 100, length: stat.size },
    function (progress) {
      console.log(progress);
    }
  );

  readStream.pipe(str).pipe(res);
}
