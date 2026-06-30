import runpod
import base64
# Trigger Github Action v2
import os

# Menggunakan CogVideoX-2B buatan THUDM. Ini adalah salah satu model Open-Source terbaik saat ini.
# Hasilnya sangat sinematik, realistis, dan sangat cocok berjalan di GPU RTX 4090 (24GB VRAM).
MODEL_ID = "THUDM/CogVideoX-2b"

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
        print("🚀 Memuat dan mendownload model CogVideoX (15GB)... Harap tunggu.")
        pipe = CogVideoXPipeline.from_pretrained(MODEL_ID, torch_dtype=torch.float16)
        
        # Jurus pamungkas ngirit VRAM biar nggak Out Of Memory (OOM) di 24GB
        pipe.enable_model_cpu_offload()
        pipe.vae.enable_slicing()
        pipe.vae.enable_tiling()
        print("✅ Model AI sukses terpasang di VRAM!")

    job_input = job.get('input', {})
    
    # Mengambil prompt dari user (kalau kosong, pakai prompt default)
    prompt = job_input.get('prompt', 'A cinematic tracking shot of a futuristic cyberpunk city at night, neon lights reflecting on wet streets, 4k resolution.')
    
    # Settingan default untuk kualitas video
    num_frames = job_input.get('num_frames', 49) # Panjang video standar (sekitar 6 detik)
    guidance_scale = job_input.get('guidance_scale', 6.0)

    print(f"🎬 Mulai merender video untuk prompt: {prompt}")

    try:
        # Proses merender teks jadi video (Ini yang bikin GPU kerja keras)
        video_tensor = pipe(
            prompt=prompt,
            num_frames=num_frames,
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
