// import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import AbstraxionProviderWrapper from "@/components/abstraxion_provider_wrapper";
import { GlobalProvider } from "@/lib/globalProvider";
import { Toaster } from "react-hot-toast";

const RubikFont = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex",
});

export const metadata = {
  title: "Tracky",
  description: "AI-powered and Blockchain Tracking Website",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={`${RubikFont.variable}  antialiased`}>
        <AbstraxionProviderWrapper>
          <GlobalProvider>
            {children}
            <Toaster />
          </GlobalProvider>
        </AbstraxionProviderWrapper>
      </body>
    </html>
  );
}