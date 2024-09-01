import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../assets/globals.css";
import NavigationBar from "@/components/NavigationBar";
import { AuthProvider } from "@/context/AuthContext";
import { VideoProvider } from "@/context/VideoContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShareTube",
  description: "Share your favourite YouTube videos with friends within a click!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <VideoProvider>
            <NavigationBar />
            {children}
          </VideoProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
