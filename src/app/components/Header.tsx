"use client"; 

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  return (
    <header className="bg-gray-100 p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="font-bold text-xl text-black">
          API Forge
        </Link>
        <div className="flex items-center gap-4">
          {isLoading ? (
            <div className="text-gray-500">Loading...</div>
          ) : session ? (
            <>
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-black"
              >
                Dashboard
              </Link>
              <span className="text-gray-700">{session.user?.email}</span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-700 hover:text-black">
                Login
              </Link>
              <Link
                href="/register"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
