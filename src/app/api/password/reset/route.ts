import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token, password } = body;

    if (!token || !password) {
      return new NextResponse("Missing token or password", { status: 400 });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const tokenRecord = await prisma.passwordResetToken.findUnique({
      where: { token: hashedToken },
    });

    if (!tokenRecord) {
      return new NextResponse("Invalid token", { status: 400 });
    }

    if (new Date() > new Date(tokenRecord.expires)) {
      return new NextResponse("Token has expired", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.update({
      where: { id: tokenRecord.userId },
      data: { password: hashedPassword },
    });

    await prisma.passwordResetToken.delete({
      where: { id: tokenRecord.id },
    });

    return new NextResponse("Password has been reset successfully.", {
      status: 200,
    });
  } catch (error) {
    console.error("[PASSWORD_RESET_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
