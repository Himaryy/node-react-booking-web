# 🏢 Booking App Sederhana

Aplikasi booking ruangan sederhana berbasis web, terdiri dari backend (Express.js + Prisma) dan frontend (React + React Router + Shadcn UI).

## 🛑 Catatan

> ⚠️ **Belum mendukung tampilan mobile / responsif**.  
> Silakan gunakan **desktop browser** untuk pengalaman terbaik.

> 🧪 **Coba akses Admin Panel dengan akun berikut:**

```bash
email: admin@example.com
password: adminpassword
```

---

## ✨ Fitur Utama

- ✅ Autentikasi dengan JWT (Login Admin & User)
- 📆 Peminjaman ruangan dengan validasi waktu
- 🖼️ Upload gambar ruangan via ImageKit
- 🧾 Validasi data form dengan Zod
- 📊 Panel admin untuk manajemen ruangan & booking

---

## 🏗️ Tech Stack

### 🔙 Backend

- **Express.js**
- **Prisma ORM**
- **PostgreSQL** (via [Neon](https://neon.tech))
- **JWT** (JSON Web Token)
- **ImageKit** (untuk upload gambar)
- **CORS**, **bcrypt**, **multer**, dll

### 🔜 Frontend

- **React**
- **React Router v7**
- **Shadcn UI**
- **Zod** (validasi form)
- **Axios**

---

## ⚙️ Setup

```bash
DATABASE_URL=
ACCESS_TOKEN_EXPIRE=
ACCESS_TOKEN=
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=
```

```bash
# Install dependency
npm install

# Setup Prisma & generate client
npx prisma generate

# Seed data (opsional)
npx prisma db seed
```
