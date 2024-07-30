import { NextResponse } from "next/server";
import validateMasterpassword from "@/actions/validateMasterpassword";
import db from "@/lib/db";
import createPassword from "@/actions/createPassword";
import { Password } from "@prisma/client";
import { TypeOf } from "zod";
import { CardSchema, NoteSchema, PasswordSchema } from "@/schema";
import createCard from "@/actions/createCard";
import { Card } from "@/components/ui/card";
import { Session } from "next-auth";
import createNote from "@/actions/createNote";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, masterPassword, variant, ...props } = body;

    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }
    if (!masterPassword) {
      return new NextResponse("Master Password is required", { status: 400 });
    }

    if (!variant) {
      return new NextResponse("Variant is required for any kind of creation");
    }

    const masterPasswordValidation = await validateMasterpassword(email, masterPassword);

    if (!masterPasswordValidation) {
      return new NextResponse("Invalid login details", { status: 400 });
    }
    let dummySession: Session = {
      expires: "",
      user: {
        id: "",
        email,
        masterPassword,
        vaultTimeOut: "15",
        logInTime: Date.now(),
      },
    };

    if (variant === "password") {
      const password = await createPassword(props as TypeOf<typeof PasswordSchema>, props.passwordId, dummySession);

      if (!password) {
        return new NextResponse("Having trouble while creating your password", { status: 400 });
      }

      return NextResponse.json(password);
    }
    if (variant === "card") {
      const card = await createCard(props as TypeOf<typeof CardSchema>, props.passwordId, dummySession);

      if (!card) {
        return new NextResponse("Having trouble while creating your card", { status: 400 });
      }

      return NextResponse.json(card);
    }

    if (variant === "note") {
      const note = await createNote(props as TypeOf<typeof NoteSchema>, props.noteId, dummySession);

      if (!note) {
        return new NextResponse("Having trouble while creating your note", { status: 400 });
      }

      return NextResponse.json(note);
    }

    return new NextResponse("Invalid Variant", { status: 400 });
  } catch (error) {
    console.log("[USER_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
