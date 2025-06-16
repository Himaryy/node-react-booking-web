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
  console.log(namaRuangan);

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

    console.log(newRuangan);
    return res.status(200).json({
      success: true,
      data: newRuangan,
      message: "Successfully Create Ruangan",
    });
  } catch (error) {
    console.log("error during create ruangan: ", error);
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
    console.log("error occured : ", error);
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
    console.log("Error occured ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error ",
    });
  }
};

export const updateRuangan = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res
) => {
  const { namaRuangan } = req.body;
  try {
    const idRuangan = parseInt(req.params.id);
    console.log(idRuangan);

    const ruangan = await prisma.ruangan.update({
      where: {
        id: idRuangan,
      },
      data: { namaRuangan },
    });
    console.log(ruangan);

    return res.status(200).json({
      success: true,
      message: "Ruangan updated successfully",
      data: { ruangan },
    });
  } catch (error) {
    console.log("Error occured ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error ",
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
    console.log("Error occured ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error ",
    });
  }
};
