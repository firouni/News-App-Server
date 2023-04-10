const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
    {
    title: {
        type: String,
        required: true,
    },
    name: String,
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    cover: {
        type: String,
        required: true,
    },
    description: String,
    picturePath: String,
    userPicturePath: String,
    category: {
        type: String,
        //required: true,
    },
    likes: {
        type: Map,
        of: Boolean,
    },
    comments: {
        type: Array,
        default: [],
    },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Blogs", BlogSchema);
