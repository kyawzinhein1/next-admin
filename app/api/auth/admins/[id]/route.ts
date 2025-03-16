import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name, email, role } = await req.json();

    const adminId = Number(params.id);

    if (isNaN(adminId)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const updatedAdmin = await prisma.admin.update({
      where: { id: adminId },
      data: { name, email, role },
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
