import { PrismaClient } from "@prisma/client";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

export const createBooking = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res
) => {
  const {
    keperluanRuangan,
    tanggalPeminjaman,
    waktuMulai,
    durasiPeminjaman,
    // userId,
    ruanganId,
  } = req.body;

  try {
    // const waktuMulaiDate = new Date(waktuMulai); // UTC
    const tanggalMulai = DateTime.fromISO(tanggalPeminjaman, {
      zone: "Asia/Jakarta",
    });
    const waktuMulaiDate = DateTime.fromISO(waktuMulai, {
      zone: "Asia/Jakarta",
    });

    // Gabung tanggal mulai dan waktu mulai
    const tanggalWaktuMulai = tanggalMulai.set({
      hour: waktuMulaiDate.hour,
      minute: waktuMulaiDate.minute,
      second: 0,
      millisecond: 0,
    });

    const waktuAkhirDate = tanggalWaktuMulai.plus({ hours: durasiPeminjaman });

    const userId = req.user?.id;

    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan.",
      });
    }

    const newBooking = await prisma.booking.create({
      data: {
        keperluanRuangan,
        // tanggalPeminjaman: new Date(tanggalPeminjaman),
        tanggalPeminjaman: tanggalWaktuMulai
          .setZone("UTC", { keepLocalTime: true })
          .startOf("day")
          .toJSDate(),

        waktuMulai: tanggalWaktuMulai.toJSDate(), // ✅ ini yang fix
        waktuAkhir: waktuAkhirDate.toJSDate(),
        durasiPeminjaman,
        status: "Submit",
        userId,
        ruanganId,
      },
    });
    console.log(newBooking);

    return res.status(200).json({
      success: true,
      message: "Successfully Booking",
      data: newBooking,
    });
  } catch (error) {
    console.log("error during create ruangan: ", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRuanganBookings = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res
) => {
  const ruanganId = parseInt(req.params.id);
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        ruanganId,
        status: "Approved",
      },
      select: {
        id: true,
        tanggalPeminjaman: true,
        waktuMulai: true,
        waktuAkhir: true,
        durasiPeminjaman: true,
      },
    });

    return res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.log("error occured : ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllBookingByAdmin = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res
) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You are not authorized",
      });
    }

    const allBooking = await prisma.booking.findMany({
      include: {
        ruangan: {
          select: {
            id: true,
            namaRuangan: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Success Find All Booking",
      data: allBooking,
    });
  } catch (error) {
    console.log("error occured : ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllBookingByUser = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User ID not found",
      });
    }
    const allBooking = await prisma.booking.findMany({
      where: { userId },
      // where: { userId, status: "Approved" },

      //
      include: {
        ruangan: {
          select: { namaRuangan: true },
        },
      },
    });
    console.log(allBooking);

    return res.status(200).json({
      success: true,
      message: "Success Find All Booking",
      data: allBooking,
      // data: {
      //   id,
      //   keperluanRuangan,
      //   tanggalPeminjaman: tanggalPeminjaman.toISOString(),
      //   waktuMulai: waktuMulai.toISOString(),
      //   waktuAkhir: waktuAkhir.toISOString(),
      //   durasiPeminjaman,
      //   status: allBooking.status,
      //   ruangan: ruanganId,
      //   createdAt,
      // },
    });
  } catch (error) {
    console.log("error occured : ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getBookingByUser = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res
) => {
  // console.log("object");
  try {
    const bookingId = parseInt(req.params.id);
    const userId = req.user.id;

    const getBooking = await prisma.booking.findFirst({
      // const getBooking = await prisma.booking.findMany({
      where: {
        id: bookingId,
        userId: userId,
      },
      include: {
        // user: true,
        ruangan: true,
      },
    });

    if (!getBooking) {
      return res.status(500).json({
        success: false,
        message: "Booking not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Success get Booking",
      data: getBooking,
    });
  } catch (error) {
    console.log("error occured : ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateBookingByAdmin = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res
) => {
  const {
    keperluanRuangan,
    tanggalPeminjaman,
    waktuMulai,
    durasiPeminjaman,
    ruanganId,
    // namaRuangan,
    status,
  } = req.body;

  try {
    const tanggalMulai = DateTime.fromISO(tanggalPeminjaman, {
      zone: "Asia/Jakarta",
    });
    const waktuMulaiDate = DateTime.fromISO(waktuMulai, {
      zone: "Asia/Jakarta",
    });

    const tanggalWaktuMulai = tanggalMulai.set({
      hour: waktuMulaiDate.hour,
      minute: waktuMulaiDate.minute,
      second: 0,
      millisecond: 0,
    });

    const waktuAkhirDate = tanggalWaktuMulai.plus({ hours: durasiPeminjaman });

    const bookingId = parseInt(req.params.id);
    console.log(bookingId);

    const userId = await prisma.user.findFirst({
      where: {
        id: req.user.id,
        // role:'User'
      },
    });
    console.log(userId);

    // Validasi bentrok dengan booking lain yang sudah Approved
    if (userId.role == "Admin") {
      const conflictBooking = await prisma.booking.findFirst({
        where: {
          id: { not: bookingId },
          ruanganId,
          status: "Approved",
          // namaRuangan,
          tanggalPeminjaman: {
            gte: tanggalWaktuMulai.startOf("day").toJSDate(),
            lt: tanggalWaktuMulai.endOf("day").toJSDate(),
          },
          AND: [
            { waktuMulai: { lt: waktuAkhirDate.toJSDate() } },
            { waktuAkhir: { gt: waktuMulaiDate.toJSDate() } },
          ],
        },
      });

      if (conflictBooking) {
        return res.status(400).json({
          success: false,
          message:
            "Ruangan sudah dibooking pada waktu tersebut dan telah disetujui.",
        });
      }
    }

    const bookingUpdate = await prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        keperluanRuangan,
        tanggalPeminjaman: tanggalWaktuMulai
          .setZone("UTC", { keepLocalTime: true })
          .startOf("day")
          .toJSDate(),
        waktuMulai: tanggalWaktuMulai.toJSDate(), // ✅ ini yang fix
        waktuAkhir: waktuAkhirDate.toJSDate(),
        durasiPeminjaman,
        status: status,

        // userId: userId.id,
        ruanganId: ruanganId,
      },
      include: {
        ruangan: true,
      },
    });

    console.log(bookingUpdate);

    return res.status(200).json({
      success: true,
      message: "Success Update Booking Ruangan",
      data: { bookingUpdate },
    });
  } catch (error) {
    console.log("error occured : ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getBookingByDateAndRoomByAdmin = async (req, res) => {
  const { tanggalPeminjaman, ruanganId } = req.query;

  try {
    const tanggal = new Date(tanggalPeminjaman);
    const startOfDay = new Date(tanggal.setHours(0, 0, 0, 0));
    const endOfDay = new Date(tanggal.setHours(24, 0, 0, 0));

    const bookings = await prisma.booking.findMany({
      where: {
        ruanganId: parseInt(ruanganId),
        tanggalPeminjaman: {
          gte: startOfDay,
          lt: endOfDay,
        },
        status: "Approved",
      },
      select: {
        id: true,
        user: { select: { name: true } },
        waktuMulai: true,
        waktuAkhir: true,
        status: true,
      },
    });

    return res.json({ success: true, data: bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error when get data by date and room by admin",
    });
  }
};

export const updateBookingByUser = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res
) => {
  const {
    keperluanRuangan,
    tanggalPeminjaman,
    waktuMulai,
    durasiPeminjaman,
    ruanganId,
  } = req.body;

  try {
    const tanggalMulai = DateTime.fromISO(tanggalPeminjaman, {
      zone: "Asia/Jakarta",
    });
    const waktuMulaiDate = DateTime.fromISO(waktuMulai, {
      zone: "Asia/Jakarta",
    });

    // Gabung tanggal mulai dan waktu mulai
    const tanggalWaktuMulai = tanggalMulai.set({
      hour: waktuMulaiDate.hour,
      minute: waktuMulaiDate.minute,
      second: 0,
      millisecond: 0,
    });

    const waktuAkhirDate = tanggalWaktuMulai.plus({ hours: durasiPeminjaman });

    const bookingId = parseInt(req.params.id);
    console.log(bookingId);

    const userId = await prisma.user.findFirst({
      where: {
        id: req.user.id,
      },
    });
    console.log(userId);

    const booking = await prisma.booking.findFirst({
      where: {
        id: bookingId,
      },
    });

    if (userId.id != booking.userId && userId.role === "User") {
      return res.status(500).json({
        success: false,
        message: "Cannot Change Others Booking",
      });
    }

    if (booking.status != "Submit" && userId.role == "User") {
      return res.status(500).json({
        success: false,
        message: "You are not authorized",
      });
    }

    const bookingUpdate = await prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        keperluanRuangan,
        tanggalPeminjaman: tanggalWaktuMulai
          .setZone("UTC", { keepLocalTime: true })
          .startOf("day")
          .toJSDate(),
        waktuMulai: tanggalWaktuMulai.toJSDate(), // ✅ ini yang fix
        waktuAkhir: waktuAkhirDate.toJSDate(),
        durasiPeminjaman,
        status: "Submit",

        userId: userId.id,
        ruanganId: ruanganId,
      },
    });

    console.log(bookingUpdate);

    return res.status(200).json({
      success: true,
      message: "Success Update Booking Ruangan",
      data: { bookingUpdate },
    });
  } catch (error) {
    console.log("error occured : ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteBooking = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res
) => {
  try {
    const idBooking = parseInt(req.params.id);

    await prisma.booking.delete({ where: { id: idBooking } });

    return res.status(200).json({
      success: true,
      message: "Successfully Cancel Booking",
    });
  } catch (error) {
    console.log("error occured : ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
