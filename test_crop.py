import numpy as np
import imageio
from PIL import Image
import os
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf8')

def test_aspect_ratio(aspect_ratio, num_frames=49):
    print(f"\n--- Testing Aspect Ratio: {aspect_ratio} ---")
    
    # 1. Bikin mock output AI (List of PIL Images 720x480)
    # Kita warnain merah biar kelihatan kalau sukses disave
    gen_width, gen_height = 720, 480
    video_tensor = [Image.new('RGB', (gen_width, gen_height), color='red') for _ in range(num_frames)]
    
    # 2. Logika Crop (Persis kayak di handler.py)
    if aspect_ratio == '9:16':
        crop_w = 270
        start_x = (720 - crop_w) // 2
        cropped_frames = [np.array(f)[:, start_x:start_x+crop_w, :].copy() for f in video_tensor]
    elif aspect_ratio == '1:1':
        crop_w = 480
        start_x = (720 - crop_w) // 2
        cropped_frames = [np.array(f)[:, start_x:start_x+crop_w, :].copy() for f in video_tensor]
    else: # 16:9
        cropped_frames = [np.array(f) for f in video_tensor]
        
    # Print ukuran setelah di-crop
    print(f"Shape array frame 1: {cropped_frames[0].shape}")
    print(f"Is array contiguous? {cropped_frames[0].flags['C_CONTIGUOUS']}")
    
    # 3. Logika Save Video (Persis kayak di handler.py)
    output_path = f"test_{aspect_ratio.replace(':', '_')}.mp4"
    try:
        writer = imageio.get_writer(output_path, fps=8, codec='libx264', macro_block_size=None, pixelformat='yuv420p', quality=5)
        for frame in cropped_frames:
            writer.append_data(frame)
        writer.close()
        print(f"SUKSES! Video tersimpan di {output_path}")
        
        # Check filesize to ensure it's not empty
        size = os.path.getsize(output_path)
        print(f"Ukuran file: {size} bytes")
        
        # Calculate duration based on frames
        duration = len(cropped_frames) / 8.0
        print(f"Durasi video: {duration} detik (sesuai request user)")
        
    except Exception as e:
        print(f"GAGAL! Error: {e}")

if __name__ == "__main__":
    # Test semua rasio
    test_aspect_ratio('16:9')
    test_aspect_ratio('9:16')
    test_aspect_ratio('1:1')
