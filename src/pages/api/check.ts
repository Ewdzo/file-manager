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
  if (req.method !== "GET") {
    res.status(400).json({ message: "Try GET method!" });
    return;
  }

  if (!fs.existsSync("./public/config/users.json")) res.status(405).send({message: "❌ - Setup not completed"});
  if (!fs.existsSync("./public/config/files.json")) res.status(405).send({message: "❌ - Setup not completed"});
  if (!fs.existsSync("./public/config/servers.json")) res.status(405).send({message: "❌ - Setup not completed"});

  res.status(200).json({ message: "Configuração realizada com sucesso" });
}
