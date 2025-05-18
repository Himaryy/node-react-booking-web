Aplikasi manajemen peminjaman ruangan, terdiri dari backend (Express.js + Prisma ORM) dan frontend (SOON).

---

## 📁 Struktur Proyek

📦 project-root/
├── backend/
│ ├── controllers/
│ │ ├── booking.controller.js
│ │ ├── ruangan.controller.js
│ │ └── user.controller.js
│ ├── middleware/
│ │ └── auth.js
│ ├── node_modules/
│ ├── prisma/
│ │ ├── schema.prisma
│ │ └── seed.js
│ ├── routes/
│ │ ├── admin.routes.js
│ │ └── user.routes.js
│ ├── utils/
│ │ ├── jwt.js
│ │ └── token.js
│ ├── .env
│ ├── package.json
│ └── index.js
└── frontend (SOON)/

## 🚀 Fitur Backend

- Auth (register, login) dengan JWT
- Role: `Admin` dan `User`
- Booking ruangan (CRUD)
- Validasi konflik waktu booking
- Manajemen data ruangan dan user
- Otentikasi dan otorisasi middleware
- Format waktu menggunakan ISO + Timezone support

---

## ⚙️ Teknologi yang Digunakan

| Teknologi  | Keterangan                           |
| ---------- | ------------------------------------ |
| Express.js | Framework backend REST               |
| Prisma ORM | Query database (MySQL/PostgreSQL)    |
| JWT        | Autentikasi token-based              |
| Bcrypt     | Enkripsi password                    |
| Nodemon    | Hot reload selama development        |
| CORS       | Mengizinkan permintaan dari frontend |
| dotenv     | Konfigurasi variabel lingkungan      |

# 1. Masuk ke folder backend

cd backend

# 2. Install semua dependencies

npm install

# 3. Buat file .env (contoh isinya)

echo "DATABASE_URL=\"postgresql://user:password@localhost:5432/yourdb\"" >> .env
echo "ACCESS_TOKEN=\"your_jwt_secret\"" >> .env
echo "ACCESS_TOKEN_EXPIRE = 100" >> .env
echo "PORT=5000" >> .env

# 4. Generate Prisma client

npx prisma generate

# 5. Buat migrasi awal dan push ke database

npx prisma migrate dev --name init

# 6. (Opsional) Jalankan seed data jika ada file prisma/seed.js

node prisma/seed.js

# 7. Jalankan server dengan nodemon

npm run dev
