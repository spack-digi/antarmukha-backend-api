const { Contact } = require("../models");

exports.createContact = async (req, res, next) => {
  try {
    const { name, phone, programType, note } = req.body;
    console.log(req.body, "programType");

    const created = await Contact.create({
      name,
      phone,
      programType,
      note,
    });

    res.status(201).json({
      success: true,
      message: "Contact form submitted successfully",
      data: created,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllContact = async (req, res, next) => {
  try {
    // page & limit from query params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    // use findAndCountAll for pagination
    const { count, rows: contacts } = await Contact.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      message: "All contacts fetched successfully",
      data: contacts,

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
