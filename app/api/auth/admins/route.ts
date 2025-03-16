import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const adminList = await prisma.admin.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isBan: true,
      },
    });
    return NextResponse.json({
      success: true,
      data: adminList,
    });
  } catch (error) {
    console.error("Error fetching admins:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch admins",
      },
      { status: 500 }
    );
  }
}
