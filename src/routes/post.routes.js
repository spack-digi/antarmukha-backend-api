const express = require("express");
const {
  createPost,
  getAllPost,
  getAllCounts,
  getAllPrograms,
  deletePost,
  updatePost,
} = require("../controllers/post.controller");

const router = express.Router();
router.post("/", createPost);
router.get("/", getAllPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.get("/programs", getAllPrograms);
router.get("/counts", getAllCounts);

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Program schedule and dashboard APIs
 */

/**
 * @swagger
 * /post:
 *   post:
 *     summary: Create schedule date for one or multiple programs
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - postId
 *               - date
 *             properties:
 *               postId:
 *                 oneOf:
 *                   - type: integer
 *                     example: 1
 *                   - type: array
 *                     items:
 *                       type: integer
 *                     example: [1, 2, 3]
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-02-20T00:00:00.000Z"
 *     responses:
 *       201:
 *         description: Date added successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /post:
 *   get:
 *     summary: Get all programs with schedules (paginated)
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of records per page
 *     responses:
 *       200:
 *         description: All posts fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data: []
 *               pagination:
 *                 totalRecords: 20
 *                 currentPage: 1
 *                 totalPages: 2
 *                 limit: 10
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /post/{postId}:
 *   put:
 *     summary: Update post schedule date
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the post to update
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-02-25T00:00:00.000Z"
 *     responses:
 *       200:
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Post updated successfully
 *       400:
 *         description: Invalid postId or date missing
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /post/{postId}:
 *   delete:
 *     summary: Delete a scheduled post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Post ID to delete
 *         example: 1
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Post deleted successfully
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /post/programs:
 *   get:
 *     summary: Get all available programs
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: All programs fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: All Programs Fetched Successfully
 *               data:
 *                 - id: 1
 *                   title: Yoga Program
 *                 - id: 2
 *                   title: Fitness Program
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /post/counts:
 *   get:
 *     summary: Get dashboard counts (posts, contacts, bookings)
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: All counts fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 allPost: 10
 *                 allContact: 5
 *                 allBookings: 20
 *       500:
 *         description: Server error
 */

module.exports = router;
