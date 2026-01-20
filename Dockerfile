# 1. Gunakan Image resmi Playwright dari Microsoft
# Pastikan versi v1.40.0 diganti sesuai versi playwright di package.json Anda
FROM mcr.microsoft.com/playwright:v1.56.1-jammy

# 2. Tentukan folder kerja di dalam Docker
WORKDIR /app

# 3. Copy file package.json dan package-lock.json
COPY package*.json ./

# 4. Install dependencies (node_modules)
RUN npm ci

# 5. Copy seluruh sisa kode project Anda ke dalam Docker
COPY . .

# 6. Perintah default saat container dijalankan
CMD ["npx", "playwright", "test"]