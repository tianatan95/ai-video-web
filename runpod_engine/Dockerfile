# Pakai base image dari PyTorch 2.4.0 biar kompatibel sama transformers terbaru
FROM pytorch/pytorch:2.4.0-cuda12.1-cudnn9-runtime

# Set working directory di dalam container
WORKDIR /app

# Copy daftar library yang dibutuhkan
COPY requirements.txt .

# Install semua library AI-nya
RUN pip install --no-cache-dir -r requirements.txt

# Copy script utama kita ke dalam container
COPY handler.py .

# Jalankan script ini begitu server Runpod nyala
CMD ["python", "-u", "handler.py"]
