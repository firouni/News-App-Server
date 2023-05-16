const express = require("express");
const connectDB = require("./config/connectDB");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const UserRouter = require("./routes/user");
const BlogRouter = require("./routes/blog");

const app = express();
const port = 5002;

app.use(cors());
app.use(express.json());
dotenv.config();
require("dotenv").config();
connectDB();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../Client/public/upload");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});
const upload = multer({ storage: storage });
//const upload = multer({ dest: './uploads/' })
app.post('/api/upload', upload.single('file'),
    function (req, res) {
        const file = req.file;
        res.status(200).json(file.filename);
})

app.use("/users", UserRouter);
app.use("/blogs", BlogRouter);

app.listen(port, (err) => {
    err ? console.log(err) : console.log(`welcome to ${port}`);
});