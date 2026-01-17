const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./connect/database");
const port = process.env.PORT || 5000;
const Cors = require("cors");

connectDB();
const app = express();

app.use(express.json()); //help parse the json in body to js object
app.use(express.urlencoded({ extended: false })); //help parse the form in body to js object
app.use(Cors());

app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

// Start the server
app.listen(port, () => console.log(`Server listening on ${port}`));
