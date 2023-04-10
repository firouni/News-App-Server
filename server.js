const express = require("express");
const connectDB = require("./config/connectDB");
const cors = require("cors");
const dotenv = require("dotenv");
const UserRouter = require("./routes/user");
const BlogRouter = require("./routes/blog");

const app = express();
const port = 5002;

app.use(cors());
app.use(express.json());
dotenv.config();
require("dotenv").config();
connectDB();

app.use("/users", UserRouter);
app.use("/blogs", BlogRouter);

app.listen(port, (err) => {
    err ? console.log(err) : console.log(`welcome to ${port}`);
});