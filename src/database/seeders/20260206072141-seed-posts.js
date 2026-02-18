'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const posts = [
      "Angamardana",
      "Bhuta Shuddhi",
      "Surya Kriya",
      "Surya Shakti",
      "Upa-yoga",
      "Yogasanas",
    ];

    const data = posts.map(title => ({
      title,
      createdAt: now,
      updatedAt: now,
    }));

    await queryInterface.bulkInsert("AllPosts", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("AllPosts", {
      title: [
        "Angamardana",
        "Bhuta Shuddhi",
        "Surya Kriya",
        "Surya Shakti",
        "Upa-yoga",
        "Yogasanas",
      ],
    });
  },
};
