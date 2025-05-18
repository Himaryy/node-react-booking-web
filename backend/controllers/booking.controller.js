import { PrismaClient } from "@prisma/client";
import { parse } from "path";

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
    const waktuMulaiDate = new Date(waktuMulai); // UTC
    const waktuAkhirDate = new Date(
      waktuMulaiDate.getTime() + durasiPeminjaman * 60 * 60 * 1000
    );

    const userId = await prisma.user.findFirst({
      where: {
        id: req.user.id,
      },
    });

    const newBooking = await prisma.booking.create({
      data: {
        keperluanRuangan,
        tanggalPeminjaman: new Date(tanggalPeminjaman),
        waktuMulai: waktuMulaiDate,
        waktuAkhir: waktuAkhirDate,
        durasiPeminjaman,
        status: "Submit",

        userId: userId.id,
        ruanganId: ruanganId,
      },
    });
    console.log(newBooking);

    return res.status(200).json({
      success: true,
      message: "Successfully Booking",
      data: {
        newBooking,
      },
    });
  } catch (error) {
    console.log("error during create ruangan: ", error);
    return res.status(500).json({
      success: false,
      message: error.message,
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

    const allBooking = await prisma.booking.findMany();

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
    const allBooking = await prisma.booking.findMany({
      where: { userId: req.user.id },
    });
    console.log(allBooking);

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

export const getBookingByUser = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res
) => {
  console.log("object");
  try {
    const bookingId = parseInt(req.params.id);
    const userId = req.user.id;

    const getBooking = await prisma.booking.findFirst({
      where: {
        id: bookingId,
        userId: userId,
      },
      //   include: {
      //     user: true,
      //     ruangan: true,
      //   },
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
    status,
  } = req.body;

  try {
    const waktuMulaiDate = new Date(waktuMulai); // UTC
    const waktuAkhirDate = new Date(
      waktuMulaiDate.getTime() + durasiPeminjaman * 60 * 60 * 1000
    );

    const bookingId = parseInt(req.params.id);
    console.log(bookingId);

    const userId = await prisma.user.findFirst({
      where: {
        id: req.user.id,
        // role:'User'
      },
    });
    console.log(userId);

    // const booking = await prisma.booking.findFirst({
    //   where: {
    //     id: bookingId,
    //   },
    // });

    // Validasi bentrok dengan booking lain yang sudah Approved
    if (userId.role == "Admin") {
      const conflictBooking = await prisma.booking.findFirst({
        where: {
          id: { not: bookingId },
          ruanganId: ruanganId,
          tanggalPeminjaman: new Date(tanggalPeminjaman),
          status: "Approved",
          OR: [
            {
              waktuMulai: {
                lt: waktuAkhirDate,
              },
              waktuAkhir: {
                gt: waktuMulaiDate,
              },
            },
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
        tanggalPeminjaman: new Date(tanggalPeminjaman),
        waktuMulai: waktuMulaiDate,
        waktuAkhir: waktuAkhirDate,
        durasiPeminjaman,
        status: status,

        // userId: userId.id,
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
    const waktuMulaiDate = new Date(waktuMulai); // UTC
    const waktuAkhirDate = new Date(
      waktuMulaiDate.getTime() + durasiPeminjaman * 60 * 60 * 1000
    );

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
        tanggalPeminjaman: new Date(tanggalPeminjaman),
        waktuMulai: waktuMulaiDate,
        waktuAkhir: waktuAkhirDate,
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
