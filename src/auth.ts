import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { addMinutesToDate } from "./lib/utils";
import getSettings from "./actions/getSettings";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],

  session: {
    strategy: "jwt",
    maxAge: 24 * 60,
  },
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.id = token.id;
        session.user.masterPassword = token.masterPassword;
        session.user.vaultTimeOut = token.vaultTimeOut;
        session.user.logInTime = token.logInTime;
        session.user.access_token = token.access_token;
      }

      return session;
    },
    async jwt({ token, session, trigger }: { token: any; user: any; trigger?: "signIn" | "signUp" | "update"; session?: any }) {
      if (session) {
        token.email = session.user.email;
        token.name = session.user.name;
        token.id = session.user.id;
        token.logInTime = Date.now();
        if (trigger === "signIn" || trigger === "signUp") {
          const settings = await getSettings(session.user.email);
          token.vaultTimeOut = settings ? JSON.stringify(settings?.vaultTimeOut) : "15";
          token.masterPassword = null;
        } else {
          token.logInTime = Date.now();
          token.masterPassword = session.user.masterPassword;
          token.vaultTimeOut = session.user.vaultTimeOut;
        }
        token.access_token = session.user.access_token;
      }
      return token;
    },
  },
});
