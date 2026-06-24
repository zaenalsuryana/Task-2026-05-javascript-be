const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();

const userRoutes = require("./routes/userRoutes");

app.use(express.json());

app.use("/users", userRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = 3000;

const { sequelize } = require("./models");

sequelize.authenticate()
    .then(() => {
        console.log("Database connected!");
    })
    .catch((error) => {
        console.error("Database connection error:", error);
    });
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});