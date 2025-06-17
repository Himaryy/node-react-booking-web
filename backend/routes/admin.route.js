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
  deleteBooking,
  getAllBookingByAdmin,
  getBookingByDateAndRoomByAdmin,
  updateBookingByAdmin,
} from "../controllers/booking.controller.js";
import {
  getAdmin,
  loginAdmin,
  logoutAdmin,
} from "../controllers/user.controller.js";

import upload from "../middleware/uploadImages.js";

const router = express.Router();

// Login admin
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/getAdmin", isAuthenticated, isAdmin, getAdmin);

// Ruangan
router.post(
  "/ruangan",
  isAuthenticated,
  isAdmin,
  upload.single("imageUrl"),
  createRuangan
);
router.patch(
  "/ruangan/:id",
  isAuthenticated,
  isAdmin,
  upload.single("imageUrl"),
  updateRuangan
);
router.delete("/ruangan/:id", isAuthenticated, isAdmin, deleteRuangan);
router.get("/ruangan", getAllRuangan);
router.get("/ruangan/:id", getRuangan);

// Booking
router.get("/booking-admin", isAuthenticated, isAdmin, getAllBookingByAdmin);
router.patch("/booking-admin/:id", isAuthenticated, updateBookingByAdmin);
router.get(
  "/bookings-date-room",
  isAuthenticated,
  isAdmin,
  getBookingByDateAndRoomByAdmin
);
router.delete("/booking-admin/:id", isAuthenticated, isAdmin, deleteBooking);

export default router;
