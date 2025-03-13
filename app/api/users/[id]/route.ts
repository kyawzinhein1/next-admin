import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = await context.params;

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching user", error },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name, email, phone } = await req.json();
    const { id } = await params;

    if (!id || !name || !email || !phone) {
      return NextResponse.json(
        { message: "ID, name, email, and phone are required." },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, email, phone },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating user", error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json({ message: "ID is required." }, { status: 400 });
    }

    const deletedUser = await prisma.user.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(deletedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting user", error },
      { status: 500 }
    );
  }
}
