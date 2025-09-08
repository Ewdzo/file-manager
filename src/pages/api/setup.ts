import { createFolder } from "@/app/helper/createFolder";
import { Server } from "@/app/types/server.type";
import { Tag } from "@/app/types/tag.type";
import { User } from "@/app/types/user.type";
import crypto from "crypto";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
  data?: any;
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
  if (req.method !== "POST") {
    res.status(400).json({ message: "Try POST method!" });
    return;
  }

  const data = await req.body;

  if (!data.admin) {
    res.status(400).json({ message: "Missing 'admin' parameter." });
    return;
  }

  if (!data.server) {
    res.status(400).json({ message: "Missing 'server' parameter." });
    return;
  }

  const admin = data.admin as User;
  const server = data.server as Server;

  const hash = crypto.createHash("sha256");
  const secret = "fortnitebattlepass";
  const decrypted = admin.password + secret;
  hash.update(decrypted);

  const hashed = hash.digest("hex");
  admin.password = hashed;

  createFolder("/public/config");

  const users = [admin];
  const usersJson = JSON.stringify(users);

  const files: File[] = [];
  const filesJson = JSON.stringify(files);

  const servers = [server];
  const serversJson = JSON.stringify(servers);

  const tags: Tag[] = [];
  const tagsJson = JSON.stringify(tags);

  const extensions: Tag[] = [];
  const extensionJson = JSON.stringify(extensions);

  if (fs.existsSync("./public/config/users.json"))
    res.status(405).send({ message: "❌ - Failed to create users.json" });
  if (fs.existsSync("./public/config/files.json"))
    res.status(405).send({ message: "❌ - Failed to create files.json" });
  if (fs.existsSync("./public/config/servers.json"))
    res.status(405).send({ message: "❌ - Failed to create servers.json" });
  if (fs.existsSync("./public/config/tags.json"))
    res.status(405).send({ message: "❌ - Failed to create tags.json" });
  if (fs.existsSync("./public/config/extensions.json"))
    res.status(405).send({ message: "❌ - Failed to create extensions.json" });

  fs.writeFile("./public/config/users.json", usersJson, (err: any) => {
    res
      .status(405)
      .send({ message: "❌ - Failed to create users.json", data: err });
  });
  fs.writeFile("./public/config/files.json", filesJson, (err: any) => {
    res
      .status(405)
      .send({ message: "❌ - Failed to create files.json", data: err });
  });
  fs.writeFile("./public/config/servers.json", serversJson, (err: any) => {
    res
      .status(405)
      .send({ message: "❌ - Failed to create servers.json", data: err });
  });
  fs.writeFile("./public/config/tags.json", tagsJson, (err: any) => {
    res
      .status(405)
      .send({ message: "❌ - Failed to create tags.json", data: err });
  });
  fs.writeFile("./public/config/extensions.json", extensionJson, (err: any) => {
    res
      .status(405)
      .send({ message: "❌ - Failed to create extensions.json", data: err });
  });

  res.status(200).json({ message: "Configuração realizada com sucesso" });
}
