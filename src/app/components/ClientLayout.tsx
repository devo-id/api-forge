"use client";

import { SessionProvider } from "next-auth/react";
import Header from "./Header";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Header />
      <main className="container mx-auto p-4">{children}</main>
    </SessionProvider>
  );
}
