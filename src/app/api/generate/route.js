import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { prompt, style, aspectRatio, duration } = body;

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // TODO: Replace with your actual Runpod Endpoint URL and API Key
    const RUNPOD_ENDPOINT = process.env.RUNPOD_API_URL || "https://api.runpod.ai/v2/YOUR_ENDPOINT/runsync";
    const RUNPOD_API_KEY = process.env.RUNPOD_API_KEY || "YOUR_RUNPOD_API_KEY";

    // This is the payload structure usually expected by Runpod Serverless
    const payload = {
      input: {
        prompt: prompt,
        style: style,
        aspect_ratio: aspectRatio,
        duration: duration
      }
    };

    /* 
    // ==========================================
    // UNCOMMENT KODE DI BAWAH INI KALAU RUNPOD UDAH NYALA
    // ==========================================
    const response = await fetch(RUNPOD_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RUNPOD_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    
    // Asumsikan endpoint Runpod mengembalikan URL video di data.output.video_url
    return NextResponse.json({ videoUrl: data.output.video_url });
    */

    // ==========================================
    // MOCK RESPONSE SEMENTARA (sebelum Runpod nyala)
    // ==========================================
    console.log("Mocking Runpod Request:", payload);
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    return NextResponse.json({ 
      success: true,
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      debug: payload 
    });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to generate video" }, { status: 500 });
  }
}
