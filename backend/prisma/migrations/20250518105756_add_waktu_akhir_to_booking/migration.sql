/*
  Warnings:

  - Added the required column `waktuAkhir` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `booking` ADD COLUMN `waktuAkhir` DATETIME(3) NOT NULL;
