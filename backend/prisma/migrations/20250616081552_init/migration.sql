-- CreateEnum
CREATE TYPE "roleUser" AS ENUM ('Admin', 'User');

-- CreateEnum
CREATE TYPE "statusRuangan" AS ENUM ('Submit', 'Rejected', 'Approved');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "roleUser" NOT NULL DEFAULT 'User',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ruangan" (
    "id" SERIAL NOT NULL,
    "namaRuangan" TEXT NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ruangan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "ruanganId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "keperluanRuangan" TEXT NOT NULL,
    "tanggalPeminjaman" TIMESTAMP(3) NOT NULL,
    "waktuMulai" TIMESTAMP(3) NOT NULL,
    "waktuAkhir" TIMESTAMP(3) NOT NULL,
    "durasiPeminjaman" INTEGER NOT NULL,
    "status" "statusRuangan" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_ruanganId_fkey" FOREIGN KEY ("ruanganId") REFERENCES "Ruangan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
