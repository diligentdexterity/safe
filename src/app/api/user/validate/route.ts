import { NextResponse } from "next/server";
import validateMasterpassword from "@/actions/validateMasterpassword";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, password } = body;

    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }
    if (!password) {
      return new NextResponse("Master Password is required", { status: 400 });
    }

    const masterPasswordValidation = await validateMasterpassword(email, password);

    return NextResponse.json(masterPasswordValidation);
  } catch (error) {
    console.log("[VARIANT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
