import { NextResponse } from 'next/server';

export async function GET() {
  const backendUrl = ""; // Unified deployment, everything is local now!
  
  try {
    // Forward the request to the real express backend
    const res = await fetch(`${backendUrl}/api/admin/setup`, {
        cache: 'no-store'
    });
    const data = await res.json();
    
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ 
        error: "Failed to connect to backend", 
        details: error.message,
        triedUrl: `${backendUrl}/api/admin/setup`
    }, { status: 500 });
  }
}
