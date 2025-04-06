import { AES } from "crypto-js";
import dotenv from 'dotenv';
import fs from "fs";
import { Server } from "../types/server.type";
import { User } from "../types/user.type";
import { createFolder } from "./createFolder";

export type setupProps = {
  admin: User;
  server: Server;
};


export const setup = ({ admin, server }: setupProps) => {
  createFolder("/config");
  dotenv.config();
  
  const users = [admin];
  const usersJson = JSON.stringify(users);
  const usersEncrypted = AES.encrypt(usersJson, process.env.KEY || "nexus").toString();

  const files = [{}];
  const filesJson = JSON.stringify(files);
  const filesEncrypted = AES.encrypt(filesJson, process.env.KEY || "nexus").toString();
  
  const servers = [server];
  const serversJson = JSON.stringify(servers);
  const serversEncrypted = AES.encrypt(serversJson, process.env.KEY || "nexus").toString();
  
  
  fs.writeFile("./config/users.json", usersEncrypted, (err) => { if (err) console.log("❌ - Failed to create users.json", err)});
  fs.writeFile("./config/files.json", filesEncrypted, (err) => { if (err) console.log("❌ - Failed to create files.json", err)});
  fs.writeFile("./config/servers.json", serversEncrypted, (err) => { if (err) console.log("❌ - Failed to create servers.json", err)});
};
