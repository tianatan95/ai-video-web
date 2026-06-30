import runpod
import base64
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
    
    # Trik gila (Monkey Patch) buat ngelewatin bug "torch.xpu" di Diffusers
    # PyTorch 2.1.0 nggak punya 'xpu', jadi kita bikin bohongan biar diffusers nggak crash.
    if not hasattr(torch, 'xpu'):
        class DummyXPU:
            def empty_cache(self): pass
        torch.xpu = DummyXPU()

    from diffusers import CogVideoXPipeline
    from diffusers.utils import export_to_video
    
    # Lazy Loading: Model baru didownload/diload pas ada pesanan masuk pertama kali.
    # Ini krusial biar Runpod nggak ngira mesin kita "Mati" gara-gara kelamaan download sebelum lapor siap.
    if pipe is None:
        print("🚀 Memuat dan mendownload model CogVideoX (15GB)... Harap tunggu.")
        pipe = CogVideoXPipeline.from_pretrained(MODEL_ID, torch_dtype=torch.float16)
        pipe.enable_model_cpu_offload()
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

        # Simpan sementara jadi file .mp4
        output_path = "/tmp/hasil_video.mp4"
        export_to_video(video_tensor, output_path, fps=8)

        # Karena ini API, kita ubah videonya jadi format Base64 Text biar gampang dikirim lewat internet ke Vercel
        with open(output_path, "rb") as video_file:
            video_b64 = base64.b64encode(video_file.read()).decode("utf-8")
        
        # Hapus file sementara biar storage Runpod nggak penuh
        os.remove(output_path)

        print("✅ Render Selesai! Mengirim video ke Frontend...")
        
        return {
            "status": "success",
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
