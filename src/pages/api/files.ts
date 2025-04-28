import { File } from "@/app/types/file.type";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

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
  if (req.method == "DELETE") {

    if (!req.query.path) {
      res.status(400).json({ message: "Missing path parameter" });
      return;
    }
    const path = req.query.path as string;

    fs.unlink("public\\" + path, (err: any) => {
      res
        .status(405)
        .send({ message: "❌ - Failed to delete " + path, data: err });
      return;
    });

    fs.readFile("./public/config/files.json", function (err, file) {
      if (err) {
        res.status(405).send({ message: "❌ - Failed to read files.json" });
        return;
      }

      const files = JSON.parse(file as unknown as string).filter((file : File) => file.path != path);
      const filesJson = JSON.stringify(files);

      fs.writeFile("./public/config/files.json", filesJson, (err: any) => {
        res
          .status(405)
          .send({ message: "❌ - Failed to save files after delete.", data: err });
        return;
      });
    });

    res.status(200).json({ message: "Success" });
    return;
  } else if (req.method !== "POST") {
    res.status(400).json({ message: "Try POST method!" });
    return;
  }

  const data = await req.body;

  console.log("AQUI", data);

  res.status(200).json({ message: "Success" });
}
