import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { prompt } = await request.json();
    
    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const RUNPOD_API_KEY = process.env.RUNPOD_API_KEY;
    const ENDPOINT_ID = process.env.RUNPOD_ENDPOINT_ID;
    
    if (!RUNPOD_API_KEY || !ENDPOINT_ID) {
      return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
    }

    // Pakai '/run' (bukan '/runsync') biar Vercel nggak timeout
    const response = await fetch(`https://api.runpod.ai/v2/${ENDPOINT_ID}/run`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RUNPOD_API_KEY}`
      },
      body: JSON.stringify({
        input: {
          prompt: prompt,
          num_frames: 49,
          guidance_scale: 6.0
        }
      })
    });

    const data = await response.json();
    
    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 500 });
    }

    // Mengembalikan Job ID ke browser biar browser yang nungguin
    return NextResponse.json({ 
      success: true, 
      jobId: data.id 
    });
    
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
