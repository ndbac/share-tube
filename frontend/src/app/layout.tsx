import { Inter } from "next/font/google";
import "../assets/globals.css";
import NavigationBar from "@/components/NavigationBar";
import { AuthProvider } from "@/context/AuthContext";
import { VideoProvider } from "@/context/VideoContext";
import { Metadata } from "next";
import NotificationProvider from "./notification";

export const metadata: Metadata = {
  title: "ShareTube",
  description:
    "Share your favourite YouTube videos with friends within a click!",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NotificationProvider>
          <AuthProvider>
            <VideoProvider>
              <NavigationBar />
              {children}
            </VideoProvider>
          </AuthProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
