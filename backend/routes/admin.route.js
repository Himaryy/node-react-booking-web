import express from "express";
// import { createUser } from "../controllers/user.controller.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.js";
import {
  createRuangan,
  deleteRuangan,
  getAllRuangan,
  getRuangan,
  updateRuangan,
} from "../controllers/ruangan.controller.js";
import {
  getAllBookingByAdmin,
  updateBookingByAdmin,
} from "../controllers/booking.controller.js";

const router = express.Router();

// Ruangan
router.post("/ruangan", isAuthenticated, isAdmin, createRuangan);
router.patch("/ruangan/:id", isAuthenticated, isAdmin, updateRuangan);
router.delete("/ruangan/:id", isAuthenticated, isAdmin, deleteRuangan);
router.get("/ruangan", getAllRuangan);
router.get("/ruangan/:id", getRuangan);

// Booking
router.get("/booking-admin", isAuthenticated, isAdmin, getAllBookingByAdmin);
router.patch("/booking-admin/:id", isAuthenticated, updateBookingByAdmin);

export default router;
