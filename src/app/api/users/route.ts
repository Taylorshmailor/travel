// src/app/api/users/route.ts

import { NextResponse } from 'next/server';
const promisePool = require('../../../server/db');

// Handle GET requests to fetch users
export async function GET() {
  try {
    const [rows] = await promisePool.query('SELECT * FROM Users');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.error();
  }
}

// Handle POST requests to create a new user
export async function POST(req: Request) {
  const body = await req.json();
  const { email, username, password } = body;

  try {
    if (!email || !username || !password) {
      throw new Error('Missing required fields');
    }

    const [result] = await promisePool.query(
      'INSERT INTO Users (username, email, password) VALUES (?, ?, ?)',
      [email, username, password]  // Ensure these match column names
    );
    return NextResponse.json({ message: 'User created successfully', userId: result.insertId });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error creating user:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error('Unknown error:', error);
      return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
    }
  }
}