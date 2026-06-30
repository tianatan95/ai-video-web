import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('jobId');

    if (!jobId) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
    }

    const RUNPOD_API_KEY = process.env.RUNPOD_API_KEY;
    const ENDPOINT_ID = process.env.RUNPOD_ENDPOINT_ID;

    const response = await fetch(`https://api.runpod.ai/v2/${ENDPOINT_ID}/status/${jobId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${RUNPOD_API_KEY}`
      }
    });

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 500 });
    }

    // Bisa IN_QUEUE, IN_PROGRESS, COMPLETED, atau FAILED
    if (data.status === 'COMPLETED' && data.output && data.output.status === 'success') {
      return NextResponse.json({ 
        status: 'COMPLETED',
        video_base64: data.output.video_base64 
      });
    } else if (data.status === 'FAILED') {
      return NextResponse.json({ status: 'FAILED', error: "Video generation failed on GPU." });
    } else {
      return NextResponse.json({ status: data.status, full_data: data });
    }

  } catch (error) {
    console.error("Status API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
