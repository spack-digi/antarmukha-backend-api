const express = require("express");
const {
  createBooking,
  getBookings,
} = require("../controllers/booking.controller");

const router = express.Router();
router.post("/", createBooking);
router.get("/", getBookings);

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Booking management APIs
 */

/**
 * @swagger
 * /booking:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: John Doe
 *             phone: 9876543210
 *             dateId: 1
 *             postId: 2
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /booking:
 *   get:
 *     summary: Get all bookings
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: List of all bookings
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data: []
 *               pagination:
 *                 totalRecords: 0
 *                 currentPage: 1
 *                 totalPages: 1
 *                 limit: 10
 *       500:
 *         description: Server error
 */

module.exports = router;
