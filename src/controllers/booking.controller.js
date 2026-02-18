const { Booking, AllPost, Post } = require("../models");

exports.createBooking = async (req, res, next) => {
  try {
    const { name, phone, dateId, postId } = req.body;

    const booking = await Booking.create({
      name,
      phone,
      dateId,
      postId,
    });

    return res.status(201).json({
      success: true,
      message: "Booking Request Successfully",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

exports.getBookings = async (req, res, next) => {
  try {
    // page & limit from query params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    const { count, rows: bookings } = await Booking.findAndCountAll({
      limit,
      offset,
      distinct: true, // important when using include
      include: [
        {
          model: AllPost,
          as: "program",
          attributes: ["id", "title"],
        },
        {
          model: Post,
          as: "schedule",
          attributes: ["id", "date"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      message: "All Bookings Fetch Successfully",
      data: bookings,

      // pagination info
      pagination: {
        totalRecords: count,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        limit,
      },
    });
  } catch (error) {
    next(error);
  }
};
