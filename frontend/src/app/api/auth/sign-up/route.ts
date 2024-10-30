import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import pool from "@/src/app/database/mysql";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    // Validate input
    if (!email || !password) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    // Check if user exists
    const [existingUser]: any = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return new NextResponse("User already exists", { status: 400 });
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user
    await pool.query(
      "INSERT INTO users (email, password, name) VALUES (?, ?, ?)",
      [email, hashedPassword, name]
    );

    console.log("User created:", email);

    return NextResponse.json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
