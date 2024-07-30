import { NextResponse } from "next/server";
import validateMasterpassword from "@/actions/validateMasterpassword";
import db from "@/lib/db";
import getUserData from "@/actions/getUserData";
import { Session } from "next-auth";

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

    if (!masterPasswordValidation) {
      return new NextResponse("Invalid login details", { status: 400 });
    }

    const userData = await db.user.findUnique({ where: { email } });

    if (!userData) {
      return new NextResponse("Cann't fetch your data", { status: 400 });
    }

    const sesstionTime = 15 * 60 * 1000; // 15 Minutes
    const session = {
      expires: Date.now() + sesstionTime,
      user: {
        email: userData.email,
        masterPassword: userData.masterPassword,
        userName: userData.name,
        id: userData.id,
      },
    };

    return NextResponse.json(session);
  } catch (error) {
    console.log("[USER_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const password = searchParams.get("password");

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
    let dummySession: Session = {
      expires: "",
      user: {
        id: "",
        email,
        vaultTimeOut: "15",
        masterPassword: password,
        logInTime: Date.now(),
      },
    };
    const userData = await getUserData(dummySession);

    if (!userData) {
      return new NextResponse("Can't fetch your data", { status: 400 });
    }

    return NextResponse.json(userData);
  } catch (error) {
    console.log("[USER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
