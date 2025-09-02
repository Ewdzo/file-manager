import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
  timestamp?: number;
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
  if (req.method == "GET") {
    res.status(200).json({ timestamp: Date.now(), message: "pong" });
  } else {
    res.status(400).json({ message: "Try GET method!" });
    return;
  }
}
