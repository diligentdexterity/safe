"use client";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import getSettings from "@/actions/getSettings";

const SessionTimeoutHandler = () => {
  const { data: session, update } = useSession();

  const sessionTimeLimit = session ? parseInt(session.user.vaultTimeOut || "15") * 60 * 1000 : 15 * 60 * 1000;

  useEffect(() => {
    console.log("sessionTimeLimit => ", sessionTimeLimit / 60 / 1000);
  }, [sessionTimeLimit]);

  useEffect(() => {
    async function handleSessionTimeOut() {
      if (!session) return;
      if (!session.user.masterPassword) return;
      console.log("SESSION LOGIN TIME ", session);

      const currentTime = Date.now();
      const totalLogedInTime = currentTime - session.user.logInTime;
      const timeRemaining = sessionTimeLimit - totalLogedInTime;

      console.log("timeRemaining", timeRemaining);

      if (timeRemaining > 0) {
        const timerId = setTimeout(async () => {
          await update({ ...session, user: { ...session.user, masterPassword: null } });
          console.log("SIGN OUT NOW");
          update();
          window.location.reload();
          // signOut();
        }, timeRemaining);

        return () => clearTimeout(timerId); // Clear the timeout if the component unmounts
      } else {
        await update({ ...session, user: { ...session.user, masterPassword: null } });
        console.log("SIGN OUT NOW");
        update();
        window.location.reload();
      }
    }
    handleSessionTimeOut();
  }, [sessionTimeLimit, update, session]);

  return null;
};

export default SessionTimeoutHandler;
