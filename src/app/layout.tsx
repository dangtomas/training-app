import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Script from "next/script";
import dbConnect from "@/db/dbConnect";

const inter = Inter({ subsets: ["latin"] });
dbConnect();

export const metadata: Metadata = {
    title: "Tréninky",
    description: "Tréninky",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className}`}>
                <Header />
                {children}
                <Script
                    src="https://kit.fontawesome.com/651d93916d.js"
                    crossOrigin="anonymous"
                />
            </body>
        </html>
    );
}
