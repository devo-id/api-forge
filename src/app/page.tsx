"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold">Welcome to API Forge</h1>
      <p className="text-lg text-gray-600 mt-4">
        The easiest way to create, manage, and share mock APIs.
      </p>
      <p className="mt-8">Please register or log in to get started.</p>
    </div>
  );
}
