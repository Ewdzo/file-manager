import { isSetUp } from "@/app/helper/isSetUp";
import { User } from "@/app/types/user.type";
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

  if (!data.user) {
    res.status(400).json({ message: "Missing 'user' parameter." });
    return;
  }

  const user = data.user as User;

  if (!isSetUp()) {
    res.status(405).send({ message: "❌ - Nexus is not configured yet!" });
    return;
  }

  fs.readFile("./public/config/users.json", function (err, file) {
    if (err) {
      res
        .status(405)
        .send({ message: "❌ - Failed to read users.json", data: err });
      return;
    }

    const users = JSON.parse(file as unknown as string);
    users.map((u: User) => {
      if (u.name == user.name) {
        res.status(405).send({ message: "❌ - User already exists" });
        return;
      }
    });
    users.push(user);
    const usersJson = JSON.stringify(users);

    fs.writeFile("./public/config/users.json", usersJson, (err: any) => {
      res
        .status(405)
        .send({ message: "❌ - Failed to create new user", data: err });
      return;
    });
  });

  res.status(200).json({ message: "Cadastro realizado com sucesso" });
}
