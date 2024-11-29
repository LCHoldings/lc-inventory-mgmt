import { NextApiRequest, NextApiResponse } from "next";
import { signIn } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Request:", req);
  if (req.method === "POST") {
    const { email } = req.body;

    try {
      console.log("Email:", email);
      await signIn("resend", { email });
      res.status(200).json({ message: "Magic link sent" });
    } catch (error) {
      res.status(500).json({ message: "Failed to send magic link", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
