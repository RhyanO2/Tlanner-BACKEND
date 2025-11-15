const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

require("dotenv/config");
const app = express();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Tlanner",
      version: "1.0.0",
      description: "Tlanner Backend routes documentation",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors({ credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/user", authRoutes);
app.use("/user", userRoutes);
app.use("/task", taskRoutes);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

module.exports = app;
