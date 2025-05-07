import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "../app/components/NavBar";
import "./globals.css";
import { SessionProvider } from "./session/SessionContext";


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
  title: "Hotel App",
  description: "Plataforma de gestión de reservas de hotel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <SessionProvider>
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
      {/* <body > */}
        {/* Barra de navegación */}
        <Navbar />
        {/* Contenido */}
        <main>{children}</main>
      </body>
    </html></SessionProvider>
  );
}
