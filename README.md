# TikTok Bulk Video Downloader

Script Node.js sederhana untuk mengunduh video TikTok secara massal tanpa watermark.

## 🚀 Fitur

- Mengunduh video TikTok secara massal dari daftar URL
- Menyimpan video dengan kualitas HD tanpa watermark
- Penamaan file otomatis dengan format: `[nomor]_[author] - [judul].mp4`
- Penghapusan otomatis URL yang sudah berhasil diunduh dari file input
- Penanganan kesalahan yang baik
- Output console berwarna untuk memudahkan monitoring

## 📋 Persyaratan

- Node.js
- NPM
- Paket yang diperlukan:
  - axios
  - fs (built-in)
  - path (built-in)

## 🛠️ Instalasi

1. Clone repository ini
2. Install dependensi yang diperlukan:
```

## 📝 Cara Penggunaan

1. Buat file `urls.txt` dan masukkan URL video TikTok (satu URL per baris)
2. Sesuaikan konfigurasi berikut di `index.js`:
   - `apiUrl`: URL API untuk mengunduh TikTok
   - `inputFile`: Nama file input (default: "urls.txt")
   - `outputFolder`: Folder untuk menyimpan hasil unduhan (default: "downloads")

3. Jalankan script:
```

## 🔧 Konfigurasi

- `apiUrl`: URL API untuk mengunduh TikTok
- `inputFile`: Nama file input (default: "urls.txt")
- `outputFolder`: Folder untuk menyimpan hasil unduhan (default: "downloads")

## 📂 Struktur File

- `index.js` - File utama script
- `urls.txt` - Daftar URL video TikTok yang akan diunduh
- `downloads/` - Folder tempat video hasil unduhan disimpan

## 🎯 Fitur Detail

1. **Sanitasi Nama File**
   - Menghapus karakter tidak valid dari nama file
   - Format: `[nomor urut]_[nama author] - [judul video].mp4`

2. **Penomoran Otomatis**
   - Melanjutkan penomoran dari file yang sudah ada
   - Mencegah duplikasi nama file

3. **Manajemen URL**
   - Menghapus URL yang sudah berhasil diunduh
   - Menyimpan progres unduhan

4. **Penanganan Kesalahan**
   - Pesan error berwarna untuk memudahkan debugging
   - Melanjutkan ke URL berikutnya jika terjadi kesalahan

## ⚠️ Catatan Penting

- Pastikan Anda memiliki izin untuk mengunduh video
- Gunakan API yang valid dan reliable
- Perhatikan batasan rate limiting dari API yang digunakan

## 🎨 Kode Warna Console

- 🟣 HEADER (Ungu) - Informasi header
- 🔵 OKBLUE (Biru) - Proses URL
- 🔷 OKCYAN (Cyan) - Informasi tambahan
- 🟢 OKGREEN (Hijau) - Sukses
- 🟡 WARNING (Kuning) - Peringatan
- 🔴 FAIL (Merah) - Error/Kegagalan
