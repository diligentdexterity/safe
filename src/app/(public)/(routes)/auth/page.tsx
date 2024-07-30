import { signIn, signOut } from "@/auth";
import React from "react";
import Logo from "../../_components/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Auth = () => {
  return (
    <div className="min-h-[calc(100vh-450px)] flex items-center justify-center">
      <div className="space-y-10">
        <div className="flex gap-x-3 text-5xl font-extrabold items-end flex-wrap">
          <h1>Get Started With</h1>
          <Logo /> <h1>Today</h1>
        </div>
        {/* <div className="space-y-5  max-w-96 mx-auto">
          <Input placeholder="Enter your email address" />
          <Input placeholder="Enter your master password" />
          <Button className="w-full text-lg font-bold">Log In</Button>
        </div> 
        <h1 className="text-xl font-extrabold text-center text-muted-foreground">OR</h1>*/}
        <form
          className="text-center"
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <Button type="submit" size="lg" className="text-lg  gap-x-3" variant="secondary">
            <Image src="/icons/Google.png" alt="Google" width={20} height={20} />
            Sign In with Google
          </Button>
        </form>
      </div>
    </div>
  );
};
export default Auth;
