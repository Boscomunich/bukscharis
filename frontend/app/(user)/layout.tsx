import { Roboto } from 'next/font/google'
import type { Metadata } from "next";
import "../globals.css";
import { Providers } from '../providers';
import Navbar from './navbar';
import { SessionProvider } from "next-auth/react"

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Bukscharis",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.className} dark:bg-darkBg bg-primary text-white`} >
        <Providers>
          <SessionProvider>
            <Navbar/>
            {children}
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
