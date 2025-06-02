import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export type SignUpInput = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const createBookingSchema = z.object({
  ruanganId: z.number().min(1),
  tanggalPeminjaman: z.string().min(1),
  waktuMulai: z.string().min(1),
  durasiPeminjaman: z.number().min(1).max(12),
  keperluanRuangan: z
    .string()
    .min(8, "Keperluan ruangan minimal 8 karakter")
    .max(500, "Keperluan ruangan maksimal 500 karakter"),
});
