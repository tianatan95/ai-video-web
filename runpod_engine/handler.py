import runpod
import base64
# Trigger Github Action v2
import os

# Menggunakan CogVideoX-5B buatan THUDM. Ini adalah versi raksasa (5 Miliar Parameter) 
# yang jauh lebih pintar bikin manusia realistis dibanding versi 2B.
MODEL_ID = "THUDM/CogVideoX-5b"

# Variabel global untuk nyimpen model biar nggak didownload ulang terus
pipe = None

def generate_video(job):
    """
    Fungsi ini yang bakal dipanggil sama Runpod setiap kali ada request dari Web Vercel lo.
    """
    global pipe
    import torch
    
    from diffusers import CogVideoXPipeline
    import imageio
    import numpy as np
    
    # Lazy Loading: Model baru didownload/diload pas ada pesanan masuk pertama kali.
    # Ini krusial biar Runpod nggak ngira mesin kita "Mati" gara-gara kelamaan download sebelum lapor siap.
    if pipe is None:
        print("🚀 Memuat dan mendownload model CogVideoX (30GB)... Harap tunggu.")
        pipe = CogVideoXPipeline.from_pretrained(MODEL_ID, torch_dtype=torch.bfloat16)
        
        # Jurus pamungkas ngirit VRAM biar nggak Out Of Memory (OOM) di 24GB
        pipe.enable_model_cpu_offload()
        pipe.vae.enable_slicing()
        pipe.vae.enable_tiling()
        print("✅ Model AI sukses terpasang di VRAM!")

    job_input = job.get('input', {})
    
    # Mengambil settingan dari Vercel
    prompt = job_input.get('prompt', 'A cinematic tracking shot...')
    aspect_ratio = job_input.get('aspectRatio', '16:9')
    duration = job_input.get('duration', '5s')
    
    # 1. Atur Resolusi (Aspect Ratio)
    # CogVideoX-2B butuh dimensi kelipatan 16.
    if aspect_ratio == '9:16':
        width, height = 432, 768
    elif aspect_ratio == '1:1':
        width, height = 512, 512
    else: # 16:9 default
        width, height = 768, 432
        
    # 2. Atur Durasi (Jumlah Frame)
    if duration == '3s':
        num_frames = 25
    else:
        num_frames = 49 # Maksimal ~6 detik biar VRAM nggak jebol
        
    guidance_scale = job_input.get('guidance_scale', 6.0)

    print(f"🎬 Mulai merender video | Prompt: {prompt} | {aspect_ratio} ({width}x{height}) | Frames: {num_frames}")

    try:
        # Proses merender teks jadi video (Ini yang bikin GPU kerja keras)
        video_tensor = pipe(
            prompt=prompt,
            num_frames=num_frames,
            width=width,
            height=height,
            guidance_scale=guidance_scale,
            num_inference_steps=50, # Jumlah step render, 50 udah ngasilin video mulus
            generator=torch.Generator("cuda").manual_seed(42),
        ).frames[0]

        # Simpan sementara jadi file .mp4 dengan kompresi tinggi biar ukurannya kecil (kisaran 1-2 MB)
        output_path = "/tmp/hasil_video.mp4"
        writer = imageio.get_writer(output_path, fps=8, codec='libx264', macro_block_size=None, pixelformat='yuv420p', quality=5)
        for frame in video_tensor:
            writer.append_data(np.array(frame))
        writer.close()

        # Karena ini API, dan video ukurannya besar (bisa kena limit payload Runpod), 
        # kita upload sementara ke catbox.moe lalu kirim URL-nya ke web Vercel.
        import subprocess
        print("Mulai upload video ke internet...")
        result = subprocess.run(
            ["curl", "-F", "reqtype=fileupload", "-F", f"fileToUpload=@{output_path}", "https://catbox.moe/user/api.php"],
            capture_output=True, text=True
        )
        video_url = result.stdout.strip()
        
        import base64
        with open(output_path, "rb") as video_file:
            video_b64 = base64.b64encode(video_file.read()).decode("utf-8")
            
        # Hapus file sementara biar storage Runpod nggak penuh
        os.remove(output_path)

        print(f"✅ Render Selesai! Video URL: {video_url[:50]}... Base64 Lenght: {len(video_b64)}")
        
        return {
            "status": "success",
            "video_url": video_url,
            "video_base64": video_b64,
            "message": "Video generated successfully"
        }

    except Exception as e:
        print(f"❌ Terjadi kesalahan: {str(e)}")
        return {
            "status": "error",
            "message": str(e)
        }

# Menyalakan server API
runpod.serverless.start({"handler": generate_video})
