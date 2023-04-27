const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const omit = (obj, ...props) => {
  const result = { ...obj };
  props.forEach((prop) => {
    delete result[prop];
  });
  return result;
};
const favoriteBlog = (blogs) => {
  let num = Math.max(...blogs.map((blog) => blog.likes));
  let filteredBlog = blogs.filter((blog) => blog.likes === num);
  let setBlog = omit(filteredBlog[0], "_id", "url", "__v");
  return setBlog;
};

const mostBlogs = (blogs) => {
  let num = Math.max(...blogs.map((blog) => blog.blogs));
  let filteredBlog = blogs.filter((blog) => blog.blogs === num);
  let setBlog = omit(filteredBlog[0], "likes");
  return setBlog;
};

const mostLikes = (blogs) => {
  let num = Math.max(...blogs.map((blog) => blog.likes));
  let filteredLikes = blogs.filter((blog) => blog.likes === num);
  let setLikes = omit(filteredLikes[0], "blogs");
  return setLikes;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
