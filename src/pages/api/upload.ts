import { createFolder } from "@/app/helper/createFolder";
import formidable from "formidable";
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
  if (req.method !== "POST") {
    res.status(400).json({ message: "Try POST method!" });
    return;
  };

  await new Promise((resolve, reject) => {
    createFolder("files");
    
    const form = formidable({
      maxFileSize: 100 * 1000 * 1024 * 1024 // 100GB limit;
    });

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      if (!files.uploads) return;

      files.uploads.map((file) => {
        const oldPath = file.filepath;
        const newPath = path.join("./", "files") + "/" + file.originalFilename;
        const rawData = fs.readFileSync(oldPath);

        if (fs.existsSync(newPath)) {
          return res.status(401).send({ message: "File already exists." });
        };

        fs.writeFile(newPath, rawData, function (err) {
          if (err) console.log(err);
          return res.status(200).send({ message: "Successfully uploaded" });
        });
      });
    });
  });


}
