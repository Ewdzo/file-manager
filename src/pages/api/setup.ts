import { createFolder } from "@/app/helper/createFolder";
import { Server } from "@/app/types/server.type";
import { User } from "@/app/types/user.type";
import { AES } from "crypto-js";
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

  createFolder("/public/config");
  
  const users = [admin];
  const usersJson = JSON.stringify(users);
  const usersEncrypted = AES.encrypt(usersJson, process.env.KEY || "nexus").toString();

  const files = [{}];
  const filesJson = JSON.stringify(files);
  const filesEncrypted = AES.encrypt(filesJson, process.env.KEY || "nexus").toString();
  
  const servers = [server];
  const serversJson = JSON.stringify(servers);
  const serversEncrypted = AES.encrypt(serversJson, process.env.KEY || "nexus").toString();
  
  if (fs.existsSync('./public/config/users.json')) res.status(405).send({message: "❌ - Failed to create users.json"});
  if (fs.existsSync('./public/config/files.json')) res.status(405).send({message: "❌ - Failed to create files.json"});
  if (fs.existsSync('./public/config/servers.json')) res.status(405).send({message: "❌ - Failed to create servers.json"});
  fs.writeFile("./public/config/users.json", usersEncrypted, (err: any) => { res.status(405).send({message: "❌ - Failed to create users.json", data: err})});
  fs.writeFile("./public/config/files.json", filesEncrypted, (err: any) => { res.status(405).send({message: "❌ - Failed to create files.json", data: err})});
  fs.writeFile("./public/config/servers.json", serversEncrypted, (err: any) => { res.status(405).send({message: "❌ - Failed to create servers.json", data: err})});

  res.status(200).json({ message: 'Configuração realizada com sucesso' });
}
