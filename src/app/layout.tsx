import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
// import Navbar from "./components/Navbar";
import { Button } from "@mantine/core";
import { NavLinks } from '@/app/components/Navbar'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "E-Commerce Website",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MantineProvider>
          <NavLinks/>
          {/* <Navbar /> */}
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
