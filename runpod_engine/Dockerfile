# Pakai base image dari Runpod PyTorch 2.6.0 biar stabil dan komplit (CUDA 12, Ubuntu 22.04)
FROM runpod/pytorch:1.0.7-cu1290-torch260-ubuntu2204

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
