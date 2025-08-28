import { mapPath } from "@/app/helper/mapPath";
import { File } from "@/app/types/file.type";
import formidable from "formidable";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";

type ResponseData = {
  message: string;
  data?: unknown;
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

    fs.unlink("public\\" + path, (err) => {
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

      const files = JSON.parse(file as unknown as string).filter(
        (file: File) => file.path != path
      );
      const filesJson = JSON.stringify(files);

      fs.writeFile("./public/config/files.json", filesJson, (err) => {
        res.status(405).send({
          message: "❌ - Failed to save files after delete.",
          data: err,
        });
        return;
      });
    });

    res.status(200).json({ message: "Success" });
    return;
  } else if (req.method == "PUT") {
    const form = formidable({
      maxFileSize: 1 * 1000 * 1024 * 1024, // 1GB limit;
      maxFields: 3 * 1000 * 1024 * 1024 * 1024, // 3GB limit;
      allowEmptyFiles: true,
      minFileSize: 0,
    });

    if (!req.query.path) {
      res.status(400).json({ message: "Missing path parameter" });
      return;
    }

    const filePath = req.query.path as string;
    const basePath = filePath
      .slice(filePath.lastIndexOf("/"))
      .replace(".", "_");

    try {
      form.on("fileBegin", (uploads, file) => {
        if (file) {
          if (!file.originalFilename) return;
          if (!mapPath(uploads).length) throw new Error();

          const extension = file.originalFilename.slice(
            file.originalFilename.lastIndexOf(".")
          );
          const fileName = basePath + extension;
          const newPath = path.join(mapPath(uploads), fileName);

          file.filepath = newPath;

          fs.readFile("./public/config/files.json", function (err, obj) {
            if (err) {
              res
                .status(405)
                .send({ message: "❌ - Failed to read files.json" });
              return;
            }

            const newFile = JSON.parse(obj as unknown as string).filter(
              (obj: File) => obj.path == filePath
            )[0];

            if (uploads == "Ícone")
              newFile.icon = newPath
                .replace("public", "")
                .replace("\\", "/")
                .replace(/\\/g, "/");

            if (uploads == "Banner")
              newFile.banner = newPath
                .replace("public", "")
                .replace("\\", "/")
                .replace(/\\/g, "/");

            if (uploads == "Logo")
              newFile.logo = newPath
                .replace("public", "")
                .replace("\\", "/")
                .replace(/\\/g, "/");

            const files = JSON.parse(obj as unknown as string).filter(
              (file: File) => file.path != filePath
            );

            files.push(newFile);

            const filesJson = JSON.stringify(files);

            fs.writeFile("./public/config/files.json", filesJson, (err) => {
              res.status(405).send({
                message: "❌ - Failed to save files after edit.",
                data: err,
              });
              return;
            });
          });
        }
      });
    } catch {
      res.status(400).json({ message: "Failed to update!" });
      return;
    }

    const data = await form.parse(req);
    fs.readFile("./public/config/files.json", function (err, obj) {
      if (err) {
        res.status(405).send({ message: "❌ - Failed to read files.json" });
        return;
      }

      const newFile = JSON.parse(obj as unknown as string).filter(
        (obj: File) => obj.path == filePath
      )[0];

      if (data[0].nome_do_arquivo) newFile.name = data[0].nome_do_arquivo[0];
      if (data[0]["descrição"]) newFile.description = data[0]["descrição"][0];

      const files = JSON.parse(obj as unknown as string).filter(
        (file: File) => file.path != filePath
      );

      files.push(newFile);

      const filesJson = JSON.stringify(files);

      fs.writeFile("./public/config/files.json", filesJson, (err) => {
        res.status(405).send({
          message: "❌ - Failed to save files after edit.",
          data: err,
        });
        return;
      });

      res.status(200).json({ message: "Success!", data: newFile });
    });
  } else {
    res.status(400).json({ message: "Try PUT or DELETE method!" });
    return;
  }
}
