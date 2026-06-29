# Pakai base image dari PyTorch yang udah ada CUDA-nya biar sinkron sama RTX 4090
FROM pytorch/pytorch:2.1.0-cuda11.8-cudnn8-runtime

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
