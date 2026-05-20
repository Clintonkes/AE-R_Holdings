import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    { status: 'healthy', app: 'AE$R Holdings' },
    { status: 200 }
  );
}
