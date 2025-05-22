import express from "express";
import { getAllRuangan } from "../controllers/ruangan.controller.js";
import { getRuanganBookings } from "../controllers/booking.controller.js";

const router = express.Router();

router.get("/ruangan", getAllRuangan);

// Public route untuk melihat booking yang sudah approved untuk satu ruangan
router.get("/ruangan/:id/bookings", getRuanganBookings);
//
export default router;
