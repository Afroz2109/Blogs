const Blog = require('../Models/blogModel');

const getBlogs = async (req, res) => {
  try {
    const data = await Blog.find();  

    res.send({
      success: true,
      message: "Blogs fetched successfully",
      data, 
    });
  } catch (error) {
    console.error("Something went wrong", error);
    res.status(500).send({ success: false, message: "Server error" });
  }
};



const addBlogs = async (req, res) => {
  try {
    const { title, description, image, userEmail } = req.body;

    if (!title || !description || !image || !userEmail) {
      return res.status(400).send({ success: false, message: "All fields required" });
    }

    const blog = new Blog({ title, description, image, userEmail });
    await blog.save();

    res.send({
      success: true,
      message: "Blog added successfully",
      blog,
    });
  } catch (error) {
    console.error("Add Blog Error:", error.message);
    res.status(500).send({ success: false, message: "Server error" });
  }
};

const updateBlogs = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    const id = req.params.id;

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, description, image },
      { new: true }
    );

    res.send({ success: true, message: "Blog updated", updatedBlog });
  } catch (error) {
    console.error("Update Blog Error:", error.message);
    res.status(500).send({ success: false, message: "Server error" });
  }
};

const deleteBlogs = async (req, res) => {
  try {
    const id = req.params.id;
    await Blog.findByIdAndDelete(id);
    res.send({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Delete Blog Error:", error.message);
    res.status(500).send({ success: false, message: "Server error" });
  }
};

module.exports = { getBlogs, addBlogs, updateBlogs, deleteBlogs };
