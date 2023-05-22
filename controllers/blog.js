const BlogSchema = require("../models/Blog");
const UserSchema = require("../models/User");
const mongoose = require("mongoose");

// Create new Post
exports.createBlog = async (req, res) => {
    try {
        const { title, userId, description, cover, picturePath } = req.body;
        const user = await UserSchema.findById(userId);
        if (!user) {
            return res.status(400).json({msg:"this id is unfounded"})
        };

        const newPost = new BlogSchema({
            title,
            name: UserSchema.pseudo,
            userId,
            description,
            cover,
            picturePath,
            userPicturePath: UserSchema.picturePath,
            likes: {},
            comments: [],
        });
        const Post = await BlogSchema.find();
        const session = await mongoose.startSession();
        session.startTransaction();
        await newPost.save({ session });
        user.blogs.push(newPost);
        await user.save({ session });
        await session.commitTransaction();
        res.status(200).json(Post);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: err.message });
    }
};

// Get a post
exports.getBlogs = async (req, res) => {
    try {
        const post = await BlogSchema.find().populate("user");
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ msg: "no posts found" });
    }
};

exports.getEditorBlogs = async (req, res) => {
    try {
        const userId = req.params.id;
        const userBlogs = await UserSchema.findById(userId);
        if (!userBlogs) {
            return res.status(404).json({ msg: "no blogs found" });
        };
        res.status(200).json(userBlogs);
    } catch (err) {
        res.status(404).json({ msg: err.message });
    }
};

// Update a post
exports.updateBlog = async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;
    try {
        const post = await BlogSchema.findByIdAndUpdate(postId);
        if (post.userId === userId) {
        await post.updateOne({ $set: req.body });
        res.status(200).json("Post Updated");
        } else {
        res.status(403).json("Action forbidden");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

// Delete a post
exports.deleteBlog = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;
    try {
        const post = await BlogSchema.findByIdAndDelete(id);
        if (post.userId === userId) {
        await post.deleteOne();
        res.status(200).json("Post deleted successfully");
        } else {
        res.status(403).json("Action forbidden");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};