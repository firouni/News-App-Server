const express = require("express");
const { createBlog, getBlogs, updateBlog, deleteBlog, getEditorBlogs } = require("../controllers/blog");

const BlogRouter = express.Router();

BlogRouter.get("/get", getBlogs);
BlogRouter.post("/add", createBlog);
BlogRouter.put("/updBlog/:id", updateBlog);
BlogRouter.delete("/dltBlog/:id", deleteBlog);

BlogRouter.get("/editor/:id", getEditorBlogs);

module.exports = BlogRouter;