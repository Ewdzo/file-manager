import { createFolder } from "@/app/helper/createFolder";
import { generateFilePath } from "@/app/helper/generateFilePath";
import formidable from "formidable";
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
  if (req.method !== "POST") {
    res.status(400).json({ message: "Try POST method!" });
    return;
  }

  // await new Promise((resolve, reject) => {
  createFolder("files");

  const form = formidable({
    maxFileSize: 100 * 1000 * 1024 * 1024, // 100GB limit;
  });

  form.on('fileBegin', (uploads, file) => {
    const folderPath = path.join("./", "files");
    const newPath = generateFilePath(folderPath, file.originalFilename);
    file.filepath = newPath;
  });

  form.on('progress', (bytesReceived, bytesExpected) => {
    const percentage = (bytesReceived / bytesExpected) * 100;
    console.log(  percentage.toFixed(4) + "%")
  });
  
  form.on("end", () => res.status(200).send({ message: "Successfully uploaded" }));
  
  await form.parse(req);
}

