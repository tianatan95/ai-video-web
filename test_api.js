// Script ini mensimulasikan persis apa yang dilakukan route.js Web lo
// TANPA memanggil Runpod (jadi Rp/saldo aman 100%).

function simulateNextJsApi(requestBody) {
    console.log(`\n--- Mensimulasikan User klik tombol Generate dari Web ---`);
    console.log(`Input dari web frontend:`, requestBody);

    const prompt = requestBody.prompt;
    const aspectRatio = requestBody.aspectRatio;
    const duration = requestBody.duration;

    if (!prompt) {
        return { error: "Prompt is required" };
    }

    // Convert duration string (e.g. '10s') to number (10)
    const durationNum = duration ? parseInt(duration.replace('s', '')) : 5;

    // Ini adalah JSON Body yang AKAN dikirim ke server Runpod.
    // Dulu aspect_ratio ini hilang karena route.js lama nggak masukin.
    const runpodPayload = {
        input: {
            prompt: prompt,
            aspect_ratio: aspectRatio || '16:9',
            duration: durationNum,
            num_frames: 49,
            guidance_scale: 6.0
        }
    };

    console.log(`\n✅ Hasil Payload yang AKAN dikirim ke Runpod:`);
    console.log(JSON.stringify(runpodPayload, null, 2));
    
    // Verifikasi otomatis
    if (runpodPayload.input.aspect_ratio === requestBody.aspectRatio) {
        console.log(`✅ TEST LULUS: aspect_ratio berhasil dikirim! (${runpodPayload.input.aspect_ratio})`);
    } else {
        console.log(`❌ TEST GAGAL: aspect_ratio gagal dikirim!`);
    }
}

// 1. User minta 9:16
simulateNextJsApi({
    prompt: "A beautiful Asian female model...",
    aspectRatio: "9:16",
    duration: "10s",
    style: "Cinematic"
});

// 2. User minta 1:1
simulateNextJsApi({
    prompt: "Another test",
    aspectRatio: "1:1",
    duration: "5s"
});
