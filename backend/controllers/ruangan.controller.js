import { PrismaClient } from "@prisma/client";
import imageKit from "../utils/imagekit.js";

const prisma = new PrismaClient();

export const createRuangan = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res
) => {
  const { namaRuangan } = req.body;
  const file = req.file;

  // const imageUrl = file ?

  try {
    let imageUrl = null;

    if (file) {
      const uplodedImage = await imageKit.upload({
        file: file.buffer,
        fileName: file.originalname,
        folder: "ruang_meeting",
      });

      imageUrl = uplodedImage.url;
    }

    const newRuangan = await prisma.ruangan.create({
      data: {
        namaRuangan,
        imageUrl,
      },
    });

    return res.status(200).json({
      success: true,
      data: newRuangan,
      message: "Successfully Create Ruangan",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllRuangan = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res
) => {
  try {
    const allRuangan = await prisma.ruangan.findMany();

    return res.status(200).json({
      success: true,
      message: "Success get All Ruangan",
      data: allRuangan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getRuangan = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res
) => {
  try {
    const idRuangan = parseInt(req.params.id);

    const ruangan = await prisma.ruangan.findFirst({
      where: {
        id: idRuangan,
      },
    });

    if (!ruangan) {
      return res.status(500).json({
        success: false,
        message: "Ruangan not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        namaRuangan: ruangan.namaRuangan,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error ",
    });
  }
};

export const updateRuangan = async (req, res) => {
  const { namaRuangan } = req.body;
  const file = req.file;

  try {
    const idRuangan = parseInt(req.params.id);
    if (isNaN(idRuangan)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ruangan ID",
      });
    }

    const oldData = await prisma.ruangan.findUnique({
      where: { id: idRuangan },
    });

    let imageUrl = oldData?.imageUrl;

    if (file) {
      const uploadedImage = await imageKit.upload({
        file: file.buffer,
        fileName: file.originalname,
        folder: "ruang_meeting",
      });
      imageUrl = uploadedImage.url;
    }

    const updatedRuangan = await prisma.ruangan.update({
      where: { id: idRuangan },
      data: {
        namaRuangan,
        imageUrl, // ini wajib jika kamu mau update gambar
      },
    });

    return res.status(200).json({
      success: true,
      message: "Ruangan updated successfully",
      data: updatedRuangan,
    });
  } catch (error) {
    console.error("Error occured", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteRuangan = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res
) => {
  try {
    const idRuangan = parseInt(req.params.id);

    await prisma.ruangan.delete({ where: { id: idRuangan } });

    return res.status(200).json({
      success: true,
      message: "Successfully Delete Ruangan",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error ",
    });
  }
};
