require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { sequelize } = require("./src/models");
const index = require("./src/routes/index");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://antharmukha-static-site.vercel.app",
      "http://localhost:5173",
      "https://antarmuka-dashboard.vercel.app",
    ],
    credentials: true,
  }),
);

app.use(express.json());

const port = process.env.PORT || 8080;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Antarmukha API's",
      version: "1.0.0",
      description: "API documentation for Antarmukha.",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
      {
        url: "https://antharmukhaapi.spackdigi.com",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

app.get("/", (req, res) => {
  res.send("Hello antarmukha, Backend is running");
});

// Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/v1", index);

sequelize
  .authenticate()
  .then(() => console.log("✅ Database connected"))
  .catch((err) => console.error("❌ DB connection error:", err));

// (async () => {
//   try {
//     await sequelize.sync({ alter: true });
//     console.log("Data base sync Success");
//   } catch (error) {
//     console.log(error.message);
//   }
// })();

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
