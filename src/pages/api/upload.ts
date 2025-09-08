import { createFolder } from "@/app/helper/createFolder";
import { generateFilePath } from "@/app/helper/generateFilePath";
import { File } from "@/app/types/file.type";
import { User } from "@/app/types/user.type";
import formidable from "formidable";
import fs from "fs";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";

type ResponseData = {
  message: string;
  data?: any;
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

  if (!req.headers.authorization || !req.headers.authorization.length) {
    res
      .status(401)
      .json({ message: "Unauthorized, please log into Nexus to proceed" });
    return;
  }

  const userData = jwt.decode(req.headers.authorization.replace("Bearer ", ""));

  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1;
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();

  const fileObj: File = {
    name: "Default Name",
    size: "0B",
    path: "/files/file/default_path.unk",
    icon: "/files/icon/default.png",
    banner: "/files/banner/default.png",
    logo: "/files/logo/default.png",
    description: "",
    tags: [],
    extension: { color: "#C0C0C0", name: ".unk" },
    owner: userData as User,
    date: `${day}-${month}-${year}`,
  };

  createFolder("./public/files/file");

  const form = formidable({
    maxFileSize: 100 * 1000 * 1024 * 1024 * 1024, // 100GB limit;
  });

  form.on("fileBegin", (uploads, file) => {
    const folderPath = path.join("./public/files/file");
    const newPath = generateFilePath(folderPath, file.originalFilename);
    file.filepath = newPath;

    fileObj.path = newPath.replace("public", "");
    if (file.originalFilename)
      fileObj.name = file.originalFilename.slice(
        0,
        file.originalFilename.lastIndexOf(".")
      );
    fileObj.extension.name = newPath.slice(newPath.lastIndexOf("."));
  });

  form.on("progress", (bytesReceived, bytesExpected) => {
    const percentage = (bytesReceived / bytesExpected) * 100;
    console.log(percentage.toFixed(4) + "%");

    if (bytesExpected / Math.pow(1024, 1) < 1024)
      fileObj.size = `${Math.floor(bytesExpected / Math.pow(1024, 1))} KB`;
    else if (bytesExpected / Math.pow(1024, 2) < 1024)
      fileObj.size = `${Math.floor(bytesExpected / Math.pow(1024, 2))} MB`;
    else fileObj.size = `${(bytesExpected / Math.pow(1024, 3)).toFixed(2)} GB`;
  });

  form.on("end", () => {
    fs.readFile("./public/config/files.json", function (err, file) {
      if (err) {
        res.status(405).send({ message: "❌ - Failed to read files.json" });
        return;
      }

      const files = JSON.parse(file as unknown as string);
      files.push(fileObj);
      const filesJson = JSON.stringify(files);

      fs.writeFile("./public/config/files.json", filesJson, (err: any) => {
        res
          .status(405)
          .send({ message: "❌ - Failed to create new file", data: err });
        return;
      });
    });

    res.status(200).send({ message: "Successfully uploaded" });
  });

  await form.parse(req);
}
