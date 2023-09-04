import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ReduxProvider from "@/components/utils/ReduxProvider";
import { ClerkProvider, auth } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });
const sora = Sora({ subsets: ["latin"], style: "normal" });

export const metadata: Metadata = {
  title: "My Closet",
  description: "Unleash your Shoping Fantcies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userName = auth();
  return (
    <ClerkProvider>
      <ReduxProvider>
        <html lang="en">
          <body className={sora.className}>
            <Navbar userId={userName.userId as string} />
            {children}
            <Contact />
            <Footer />
          </body>
        </html>
      </ReduxProvider>
    </ClerkProvider>
  );
}
