const { Op } = require("sequelize");
const { Post, AllPost, Contact, Booking } = require("../models");

exports.createPost = async (req, res, next) => {
  try {
    const { postId, date } = req.body;
    
    if (!postId || !date) {
      return res.status(400).json({
        success: false,
        message: "PostId and date are required",
      });
    }

    const postIds = Array.isArray(postId) ? postId : [postId];

    const dateToCreate = postIds.map((id) => ({
      postId: id,
      date: new Date(date),
    }));

    const created = await Post.bulkCreate(dateToCreate);

    res.status(200).json({
      success: true,
      message: "Date added successfully",
      data: created,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllPost = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    const { count, rows: allPost } = await Post.findAndCountAll({
      limit,
      offset,
      distinct: true,

      include: [
        {
          model: AllPost,
          as: "AllPosts",
          order: [["date", "ASC"]],
        },
      ],

      order: [["date", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      message: "All Posts Fetched Successfully",
      data: allPost,

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

exports.getAllPrograms = async (req, res, next) => {
  try {
    const allPrograms = await AllPost.findAll({
      attributes: ["id", "title"],
    });
    res.status(200).json({
      success: true,
      message: "All Programs Fetched Successfully",
      data: allPrograms,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllCounts = async (req, res, next) => {
  try {
    const allPost = await AllPost.count();
    const allContact = await Contact.count();
    const allBookings = await Booking.count();
    res.status(200).json({
      success: true,
      message: "All Counts Fetched Successfully",
      data: {
        allPost,
        allContact,
        allBookings,
      },
    });
  } catch (error) {
    next(error);
  }
};
