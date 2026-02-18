'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    try {
      const hash = await bcrypt.hash(
        process.env.ADMIN_PASSWORD || "password",
        10
      );

      await queryInterface.bulkInsert(
        "Users",
        [
          {
            name: "admin",
            email: "admin@gmail.com",
            password: hash,
            createdAt: now,
            updatedAt: now,
          },
        ],
        {
          ignoreDuplicates: true,
        }
      );

    } catch (err) {
      console.error("Seeder Error:", err);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", {
      email: "admin@gmail.com",
    });
  },
};
