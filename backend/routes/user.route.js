import {
  createUser,
  getUser,
  loginUser,
  logoutUser,
} from "../controllers/user.controller.js";
import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import {
  createBooking,
  deleteBooking,
  getAllBookingByUser,
  getBookingByUser,
  updateBookingByUser,
} from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", createUser);
router.post("/logout", logoutUser);

router.get("/getUser", isAuthenticated, getUser);

// Booking
router.post("/booking", isAuthenticated, createBooking);
router.get("/booking", isAuthenticated, getAllBookingByUser);
router.get("/booking/:id", isAuthenticated, getBookingByUser);
router.patch("/booking/:id", isAuthenticated, updateBookingByUser);
router.delete("/booking/:id", isAuthenticated, deleteBooking);

export default router;
