import { Inter } from "next/font/google";
import "./globals.css";
import admin from "/firebase/admin";
import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";
import UserProvider, { UserContext } from "../utils/user-provider";
import Footer from "../comps/footer";
import getUserAuth from "../utils/server_user_auth";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Poadcast transcriper",
  description: "Generated by create next app",
};

export default async function RootLayout({ children, modal }) {
  // const sessionCookie = (cookies().get("session") || {}).value;
  // let user = null;
  // if (sessionCookie) {
  //   console.log("thhis is session cookie in nav", sessionCookie);
  //   const token = await getAuth()
  //     .verifySessionCookie(sessionCookie, true /** checkRevoked */)
  //     .catch((ex) => null);
  //   console.log("this is token", token);
  //   if (token) {
  //     // console.log("error in nav", sessionCookie, token);
  //     const db = admin.firestore();
  //     // search user collection
  //     const user_docs = await db.collection("Users").doc(token.sub).get();

  //     user = user_docs.data();
  //   }
  // }

  const sessionCookie = (cookies().get("session") || {}).value;
  console.log("app/layout.js line 36: session:::::", sessionCookie);
  const user = await getUserAuth(sessionCookie || "empty");

  console.log("user session verify...", user);
  const v = user
    ? { uid: user.id, email: user.email, subInfo: user.subInfo }
    : null;

  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider value={v}>
          {children}
          <Footer />
        </UserProvider>
        {modal}
      </body>
    </html>
  );
}
