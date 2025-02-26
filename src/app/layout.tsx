import type { Metadata } from "next";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import "~/stylesheets/globals.css";
import "~/stylesheets/layout.scss";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="l-container">
        <Header />
        <main className="l-main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
