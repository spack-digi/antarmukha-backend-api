const express = require("express");
const router = express.Router();
const authroutes = require("./auth.routes");
const postRoutes = require("./post.routes");
const contactRoutes = require("./contact.routes");
const bookingRoutes = require("./booking.routes");
const userRoutes = require("./user.routes")

router.use("/auth", authroutes);
router.use("/post", postRoutes);
router.use("/contact", contactRoutes);
router.use("/booking", bookingRoutes);
router.use("/user", userRoutes);
module.exports = router;
