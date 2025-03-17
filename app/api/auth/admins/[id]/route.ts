import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name, email, role, isBan } = await req.json();

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "Not found" },
        { status: 404 }
      );
    }

    const updatedAdmin = await prisma.admin.update({
      where: { id: Number(id) },
      data: { name, email, role, isBan },
    });

    return NextResponse.json({
      success: true,
      data: updatedAdmin,
    });
  } catch (error) {
    console.error("Error updating admin:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update admin",
      },
      { status: 500 }
    );
  }
}
