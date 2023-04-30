const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (_request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", userExtractor, async (request, response) => {
  const body = request.body;
  const blog = new Blog({
    title: body.title,
    author: request.user._id,
    url: body.url,
  });

  const savedBlog = await blog.save();
  request.user.blogs = request.user.blogs.concat(savedBlog);
  await request.user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const blogToRemove = await Blog.findById(request.params.id);
  if (blogToRemove.author === request.user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  }
  return response.status(400).send("Invalid User");
});

blogsRouter.put("/:id", async (request, response) => {
  const { title, author, url, likes } = request.body;
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: "query" }
  );
  response.json(updatedBlog);
});

module.exports = blogsRouter;
