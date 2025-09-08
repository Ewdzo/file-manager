import { User } from "@/app/types/user.type";
import crypto from "crypto";
import fs from "fs";
import jwt from "jsonwebtoken";
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
  if (req.method !== "GET") {
    res.status(400).json({ message: "Try GET method!" });
    return;
  }

  const data = req.query;

  if (!data.username) {
    res.status(400).json({ message: "Missing 'username' parameter." });
    return;
  }

  if (!data.password) {
    res.status(400).json({ message: "Missing 'password' parameter." });
    return;
  }

  const user = { name: data.username as string, password: data.password as string };


  fs.readFile("./public/config/users.json", function (err, file) {
    if (err) {
      res
        .status(405)
        .send({ message: "❌ - Failed to read users.json", data: err });
      return;
    }
    
    const hash = crypto.createHash('sha256');
    const secret = "fortnitebattlepass";
    hash.update(user.password + secret);
    const data = hash.digest('hex');


    const users = JSON.parse(file as unknown as string).filter((u : User) => u.name == user.name && u.password == data);
    if(users.length) {
      const token = jwt.sign(users[0], secret, { expiresIn: "10hr" });
      res.status(200).json({ message: "Login realizado com sucesso", data: token });
      return;
    }
    
    res.status(404).send({ message: "❌ - Invalid Credentials" });
  });
}
