import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React, { FC } from "react";
import Header from "./_components/header";
import Footer from "./_components/footer";

const PublicLayout: FC<{ children: React.ReactNode }> = async ({ children }) => {
  const session = await auth();

  if (session) redirect("/passwords");

  return (
    <>
      <div>
        <Header className="h-20 container" />
        <main className="relative">
          <div className="container">{children}</div>
          <Footer className="min-h-32 mt-20" />
        </main>
      </div>
    </>
  );
};

export default PublicLayout;
