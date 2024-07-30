import { NextResponse } from "next/server";
import validateMasterpassword from "@/actions/validateMasterpassword";
import getPasswords from "@/actions/getPasswords";
import getCards from "@/actions/getCards";
import getNotes from "@/actions/getNotes";

export async function GET(req: Request, { params }: { params: { variant: string } }) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const password = searchParams.get("password");
    const { variant } = params;

    console.log("Received request with:", { email, password, variant });

    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }
    if (!password) {
      return new NextResponse("Master Password is required", { status: 400 });
    }

    const masterPasswordValidation = await validateMasterpassword(email, password);

    if (!masterPasswordValidation) {
      return new NextResponse("Invalid login details", { status: 400 });
    }

    let data;
    switch (variant) {
      case "passwords":
        data = await getPasswords(email, password);
        break;
      case "cards":
        data = await getCards(email, password);
        break;
      case "notes":
        data = await getNotes(email, password);
        break;
      default:
        return new NextResponse("Invalid Variant!", { status: 400 });
    }

    if (!data) {
      return new NextResponse("Can't fetch your data", { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.log("[USER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
