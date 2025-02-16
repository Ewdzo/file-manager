import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";

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

  if(!req.query.name) {
    res.status(400).json({ message: "Missing 'name' parameter." });
    return;
  };

  const fileName = req.query.name as string;

  var filePath = path.join("./files/", fileName);
  var stat = fs.statSync(filePath);

  res.writeHead(200, {
    "Content-Length": stat.size,
    "Content-Disposition": 'attachment; filename=' + fileName
  });

  var readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
}
