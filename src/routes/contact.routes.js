const express = require("express");
const {
  createContact,
  getAllContact,
} = require("../controllers/contact.controller");

const router = express.Router();
router.post("/", createContact);
router.get("/", getAllContact);

/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: Contact form APIs
 */

/**
 * @swagger
 * /contact:
 *   post:
 *     summary: Submit contact form
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: John Doe
 *             phone: 9876543210
 *             programType: Angamardana
 *     responses:
 *       201:
 *         description: Contact form submitted successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /contact:
 *   get:
 *     summary: Get all contact submissions
 *     tags: [Contact]
 *     responses:
 *       200:
 *         description: List of all contacts
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
