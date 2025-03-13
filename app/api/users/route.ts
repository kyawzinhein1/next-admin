import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET /api/users
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching users", error },
      { status: 500 }
    );
  }
}

// POST /api/users
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { message: "Name, email, and phone are required." },
        { status: 400 }
      );
    }

    const newUser = await prisma.user.create({
      data: { name, email, phone },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating user", error },
      { status: 500 }
    );
  }
}