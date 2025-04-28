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

  const token = req.headers['authorization']?.split(' ')[1] || "";
  const secret = "fortnitebattlepass";

  try {
    const decoded = jwt.verify(token, secret);
    res.status(200).json({
      message: "Success",
      data: decoded
    })

    return;
  } catch (e) {
    res.status(401).json({message: "Invalid Token"})
    return;
  }

}
