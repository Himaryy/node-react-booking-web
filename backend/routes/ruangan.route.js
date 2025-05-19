import express from "express";
import { getAllRuangan } from "../controllers/ruangan.controller.js";

const router = express.Router();

router.get("/ruangan", getAllRuangan);
export default router;
