import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
    const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
      const decodedToken = jwt.decode(token);
    //   console.log(decodedToken);
      
    return NextResponse.json({ admin: decodedToken });
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
