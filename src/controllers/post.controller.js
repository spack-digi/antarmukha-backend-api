const { Op } = require("sequelize");
const { Post, AllPost, Contact, Booking } = require("../models");
const { post } = require("../routes/post.routes");

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

      // filter only Post table
      where: {
        date: {
          [Op.gte]: new Date(),
        },
      },

      include: [
        {
          model: AllPost,
          as: "AllPosts",
          required: false,
        },
      ],

      order: [["date", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: allPost,
      pagination: {
        totalRecords: count,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        limit,
      },
    });
  } catch (error) {
    console.log(error);
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

exports.updatePost = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { postId, date } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Valid id is required",
      });
    }

    if (!postId && !date) {
      return res.status(400).json({
        success: false,
        message: "postId or date is required",
      });
    }

    const updateData = {};

    if (postId) updateData.postId = postId; // change AllPosts id
    if (date) updateData.date = new Date(date);

    const [updatedCount] = await Post.update(updateData, {
      where: { id }, // find using id = 67
    });

    if (!updatedCount) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    // find post
    const post = await Post.findByPk(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // check if booking exists for this post
    const bookingExists = await Booking.findOne({
      where: { dateId: id }, // Booking.dateId → Post.id
    });

    if (bookingExists) {
      return res.status(400).json({
        success: false,
        message: "Bookings exist for this post. You cannot delete this post.",
      });
    }

    // delete post
    await post.destroy();

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
