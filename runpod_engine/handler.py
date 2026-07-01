import runpod
import base64
# Trigger Github Action v2
import os

# Atur environment variable ini SEBELUM import torch buat ngehindarin fragmentasi VRAM!
# Ini ngebantu banget nge-fix OOM karena ada 9GB VRAM yang "nyangkut" (reserved but unallocated).
os.environ["PYTORCH_CUDA_ALLOC_CONF"] = "expandable_segments:True"

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
        
        # Jurus ngirit VRAM biar nggak Out Of Memory (OOM)
        pipe.enable_model_cpu_offload()
        # VAE Tiling dan Slicing kita matikan total, karena VGA 24GB kuat nahan VAE murni.
        # Fitur tiling sering bikin gambar ngeblank putih/hitam di CogVideoX-5B.
        print("✅ Model AI sukses terpasang di VRAM!")

    job_input = job.get('input', {})
    
    # Mengambil settingan dari Vercel
    prompt = job_input.get('prompt', 'A cinematic tracking shot...')
    aspect_ratio = job_input.get('aspectRatio', '16:9')
    duration = job_input.get('duration', '5s')
    
    # 1. Atur Resolusi (Aspect Ratio)
    # PENTING: CogVideoX-5B HANYA bisa dirender di 720x480. Ukuran lain bikin video jadi putih (NaN).
    gen_width, gen_height = 720, 480
        
    # 2. Atur Durasi (Jumlah Frame)
    if duration == '3s':
        num_frames = 25
    else:
        num_frames = 49 # Maksimal ~6 detik biar VRAM nggak jebol
        
    guidance_scale = job_input.get('guidance_scale', 6.0)

    print(f"🎬 Mulai merender video | Prompt: {prompt} | {aspect_ratio} ({gen_width}x{gen_height} cropped) | Frames: {num_frames}")

    try:
        # Proses merender teks jadi video (Ini yang bikin GPU kerja keras)
        video_tensor = pipe(
            prompt=prompt,
            num_frames=num_frames,
            width=gen_width,
            height=gen_height,
            guidance_scale=guidance_scale,
            num_inference_steps=50, # Jumlah step render, 50 udah ngasilin video mulus
            generator=torch.Generator("cuda").manual_seed(42),
        ).frames[0]

        import numpy as np
        
        # Crop video hasil 720x480 ke Aspect Ratio yang diminta user
        if aspect_ratio == '9:16':
            # Potong tengah jadi ukuran 270x480
            crop_w = 270
            start_x = (720 - crop_w) // 2
            cropped_frames = [np.array(f)[:, start_x:start_x+crop_w, :] for f in video_tensor]
        elif aspect_ratio == '1:1':
            # Potong tengah jadi ukuran 480x480
            crop_w = 480
            start_x = (720 - crop_w) // 2
            cropped_frames = [np.array(f)[:, start_x:start_x+crop_w, :] for f in video_tensor]
        else:
            cropped_frames = [np.array(f) for f in video_tensor]

        # Simpan sementara jadi file .mp4 dengan kompresi tinggi biar ukurannya kecil (kisaran 1-2 MB)
        output_path = "/tmp/hasil_video.mp4"
        writer = imageio.get_writer(output_path, fps=8, codec='libx264', macro_block_size=None, pixelformat='yuv420p', quality=5)
        for frame in cropped_frames:
            writer.append_data(frame)
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

# Trigger build v15
