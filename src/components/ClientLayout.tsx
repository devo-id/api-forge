"use client";

import { SessionProvider } from "next-auth/react";
import Header from "./Header";
import { ThemeProvider } from "./providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Header />
        <main className="container mx-auto p-4">{children}</main>
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  );
}
