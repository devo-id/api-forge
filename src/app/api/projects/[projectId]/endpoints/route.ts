import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(
  request: Request,
  { params }: { params: { projectId: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { projectId } = params;
  if (!projectId) {
    return new NextResponse("Project ID is required", { status: 400 });
  }

  const projectOwner = await prisma.project.findUnique({
    where: {
      id: projectId,
      userId: session.user.id,
    },
  });

  if (!projectOwner) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  try {
    const body = await request.json();
    const { method, path, jsonBody } = body;

    if (!method || !path || !jsonBody) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const endpoint = await prisma.endpoint.create({
      data: {
        method,
        path,
        jsonBody,
        projectId: projectId,
      },
    });

    return NextResponse.json(endpoint);
  } catch (error) {
    console.error("[ENDPOINT_POST_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
