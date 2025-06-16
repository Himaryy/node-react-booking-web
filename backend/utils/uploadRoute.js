import express from "express";
import multer from "multer";
import imagekit from "../utils/imagekit.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();
const upload = multer();

router.post(
  "/lib/uploads",
  upload.single("imageUrl"),
  async (
    /** @type import('express').Request */ req,
    /** @type import('express').Response */ res
  ) => {
    try {
      const file = req.file;

      if (!file) {
        return res.status(400).json({ message: "No File Upload" });
      }

      const uploaded = await imagekit.upload({
        file: file.buffer,
        fileName: file.originalname,
        folder: "ruang_meeting",
      });

      const ruangan = await prisma.ruangan.create({
        data: {
          namaRuangan: req.body.namaRuangan,
          imageUrl: uploaded.imageUrl,
        },
      });

      return res.status(200).json({
        success: true,
        data: ruangan,
        message: "Successfully Create Ruangan",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

export default router;
