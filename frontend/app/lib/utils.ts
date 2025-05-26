import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { DateTime } from "luxon";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTanggal = (tanggalISO: string) => {
  return DateTime.fromISO(tanggalISO).toFormat("dd-MM-yyyy");
};

export const formatWaktu = (tanggalISO: string) => {
  return DateTime.fromISO(tanggalISO).setZone("Asia/Jakarta").toFormat("HH:mm");
};
