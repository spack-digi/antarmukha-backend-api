    const express = require("express");
    const { getAllPost } = require("../controllers/user/userprogram-controller");

    const router = express.Router();

    router.get("/allpost", getAllPost);

    /**
     * @swagger
     * tags:
     *   name: User Programs
     *   description: User program APIs
     */

    /**
     * @swagger
     * /api/user/allpost:
     *   get:
     *     summary: Get all posts
     *     description: Fetch all user posts
     *     tags: [User Programs]
     *     responses:
     *       200:
     *         description: Successfully fetched posts
     *       500:
     *         description: Server error
     */

    module.exports = router;
