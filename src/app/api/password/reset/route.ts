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

    // 1. Hash the incoming token to match the one stored in the database
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // 2. Find the token record in the database
    const tokenRecord = await prisma.passwordResetToken.findUnique({
      where: { token: hashedToken },
    });

    // 3. Validate the token
    if (!tokenRecord) {
      return new NextResponse("Invalid token", { status: 400 });
    }

    // 4. Check if the token has expired
    if (new Date() > new Date(tokenRecord.expires)) {
      return new NextResponse("Token has expired", { status: 400 });
    }

    // 5. Hash the new password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 6. Update the user's password
    await prisma.user.update({
      where: { id: tokenRecord.userId },
      data: { password: hashedPassword },
    });

    // 7. Delete the token so it cannot be used again
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
