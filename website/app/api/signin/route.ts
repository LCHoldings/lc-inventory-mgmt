import { NextRequest, NextResponse } from "next/server";
import { signIn } from "@/auth";

export const POST = async (req: NextRequest) => {
  console.log("Request method:", req.method); // Log the request method

  try {
    const { email } = await req.json(); // Parse the JSON body
    console.log("Email received:", email); // Log the received email

    await signIn("resend", { email });
    console.log("Magic link sent to:", email); // Log success message

    return NextResponse.json({ message: "Magic link sent" }, { status: 200 });
  } catch (error) {
    console.error("Error sending magic link:", error); // Log error message
    return NextResponse.json(
      { message: "Failed to send magic link", error },
      { status: 500 }
    );
  }
};
