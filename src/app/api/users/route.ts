// src/app/api/users/route.ts

import { NextResponse } from 'next/server';
const promisePool = require('../../../server/db');

export async function GET() {
  try {
    const [rows] = await promisePool.query('SELECT * FROM Users');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.error();
  }
}

