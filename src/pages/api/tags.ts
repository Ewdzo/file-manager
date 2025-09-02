import { Tag } from "@/app/types/tag.type";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
  data?: unknown | string;
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
  if (req.method == "DELETE") {
    if (!req.query.name) {
      res.status(400).json({ message: "Missing name parameter" });
      return;
    }
    const name = req.query.name as string;

    fs.readFile("./public/config/tags.json", function (err, tag) {
      if (err) {
        res.status(405).send({ message: "❌ - Failed to read files.json" });
        return;
      }

      const tags = JSON.parse(tag as unknown as string).filter(
        (tag: Tag) => tag.name != name
      );
      const tagsJson = JSON.stringify(tags);

      fs.writeFile("./public/config/tags.json", tagsJson, (err) => {
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
    const data = JSON.parse(req.body);

    if (!req.query.name || !data.name) {
      res.status(400).json({ message: "Missing name parameter" });
      return;
    }

    if (!data.color) {
      res.status(400).json({ message: "Missing color parameter" });
      return;
    }

    const currentName = req.query.name;
    const name = data.name;
    const color = data.color;

    fs.readFile("./public/config/tags.json", function (err, tag) {
      if (err) {
        res.status(405).send({ message: "❌ - Failed to read files.json" });
        return;
      }

      const tags = JSON.parse(tag as unknown as string).filter(
        (tag: Tag) => tag.name != currentName
      );

      tags.push({ name: name, color: color });
      const tagsJson = JSON.stringify(tags);

      fs.writeFile("./public/config/tags.json", tagsJson, (err) => {
        res.status(405).send({
          message: "❌ - Failed to save files after update.",
          data: err,
        });
        return;
      });
    });

    res.status(200).json({ message: `Success, ${currentName} updated!` });
  } else if (req.method == "POST") {
    const data = JSON.parse(req.body);
    if (!data.name) {
      res.status(400).json({ message: "Missing name parameter" });
      return;
    }

    if (!data.color) {
      res.status(400).json({ message: "Missing color parameter" });
      return;
    }

    const name = data.name;
    const color = data.color;

    fs.readFile("./public/config/tags.json", function (err, tag) {
      if (err) {
        res.status(405).json({ message: "❌ - Failed to read files.json" });
        return;
      }

      const tags = JSON.parse(tag as unknown as string);
      if (tags.filter((tag: Tag) => tag.name == name).length > 0) {
        res.status(400).json({ message: "❌ - Tag already exists." });
        return;
      }
      console.log("aq");

      tags.push({ name: name, color: color });
      const tagsJson = JSON.stringify(tags);

      fs.writeFile("./public/config/tags.json", tagsJson, (err) => {
        res.status(405).json({
          message: "❌ - Failed to save files after create.",
          data: err,
        });
        return;
      });

      res.status(200).json({ message: `Success, ${name} created!` });
    });
  } else {
    res.status(400).json({ message: "Try POST, PUT or DELETE method!" });
    return;
  }
}
