"use client";
import React, { FC } from "react";
import Header from "./_components/header";
import Footer from "./_components/footer";

const PublicLayout: FC<{ children: React.ReactNode }> = async ({ children }) => {
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
