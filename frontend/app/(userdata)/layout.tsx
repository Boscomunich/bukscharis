import { Roboto } from 'next/font/google'
import type { Metadata } from "next";
import "../globals.css";
import { Providers } from '../providers';

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
      <body className={`${roboto.className} dark:bg-darkBg text-white`} >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
