import { createFolder } from "@/app/helper/createFolder";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";

type ResponseData = {
  message: string;
  files?: string[];
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
  };

  createFolder("files");
  const availableFiles: string[] = [];

  fs.readdir(path.join("./", "files"), (err, files) => {
    files.forEach(file => {
        availableFiles.push(file);
    });

    res.status(200).json({message: "Available Files:", "files": availableFiles})
  });
}
