const { Op } = require("sequelize");
const { Post, AllPost } = require("../../models");

exports.getAllPost = async (req, res, next) => {
  try {
    // page & limit from query params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { count, rows: allPost } = await AllPost.findAndCountAll({
      limit,
      offset,
      distinct: true,

      include: [
        {
          model: Post,
          as: "posts",
          where: {
            date: { [Op.gte]: today },
          },
          separate: true,
          order: [["date", "ASC"]],
        },
      ],

      order: [["createdAt", "DESC"]],
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
