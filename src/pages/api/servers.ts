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
  if (req.method == "PUT") {
    const data = JSON.parse(req.body);

    if (!req.query.name || !data.name) {
      res.status(400).json({ message: "Missing name parameter" });
      return;
    }

    if (!data.color) {
      res.status(400).json({ message: "Missing color parameter" });
      return;
    }

    const name = data.name;
    const color = data.color;

    fs.readFile("./public/config/servers.json", function (err, server) {
      if (err) {
        res.status(405).send({ message: "❌ - Failed to read servers.json" });
        return;
      }

      const servers = JSON.parse(server as unknown as string);

      servers[0] = { ...servers[0], name: name, color: color };
      const serversJson = JSON.stringify(servers);

      fs.writeFile("./public/config/servers.json", serversJson, (err) => {
        res.status(405).send({
          message: "❌ - Failed to save servers after update.",
          data: err,
        });
        return;
      });
    });

    res.status(200).json({ message: `Success, ${name} updated!` });
  } else {
    res.status(400).json({ message: "Try POST, PUT or DELETE method!" });
    return;
  }
}
