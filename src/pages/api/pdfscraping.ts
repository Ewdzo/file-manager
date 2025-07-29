import type { NextApiRequest, NextApiResponse } from "next";
import ollama from "ollama";

type ResponseData = {
  message: string;
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

  try {
    const response = await ollama.chat({
      model: "deepseek-r1:latest",
      messages: [
        {
          role: "user",
          content:
            "Responda em português. Esse é o primeiro prompt que eu faço pra você?",
        },
      ],
    });

    const answer = response.message.content
      .slice(response.message.content.indexOf("</think>"))
      .replace("</think>\n", "");

    res.status(200).json({ message: answer });

    return;
  } catch {
    res.status(401).json({ message: "Invalid Token" });
    return;
  }
}
