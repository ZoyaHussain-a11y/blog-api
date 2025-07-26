const { Blog, User } = require('../models');
const { Op } = require('sequelize');

// Create a new blog
const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const authorId = req.user.id;

    const blog = await Blog.create({ title, content, authorId });
    res.status(201).json({ message: 'Blog created successfully', blog });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create blog', error: error.message });
  }
};

// Get all blogs with pagination and optional search
const getAllBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';

    const blogs = await Blog.findAndCountAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${search}%` } },
          { content: { [Op.like]: `%${search}%` } }
        ]
      },
      include: {
        model: User,
        attributes: ['id', 'username'],
      },
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    res.json({
      totalBlogs: blogs.count,
      totalPages: Math.ceil(blogs.count / limit),
      currentPage: page,
      blogs: blogs.rows,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch blogs', error: error.message });
  }
};

// Get a single blog by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id, {
      include: {
        model: User,
        attributes: ['id', 'username'],
      },
    });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch blog', error: error.message });
  }
};

// Update a blog by ID (author only)
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (blog.authorId !== req.user.id) {
      return res.status(403).json({ message: 'You can only update your own blog' });
    }

    const { title, content } = req.body;
    await blog.update({ title, content });

    res.json({ message: 'Blog updated successfully', blog });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update blog', error: error.message });
  }
};

// Delete a blog by ID (author only)
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (blog.authorId !== req.user.id) {
      return res.status(403).json({ message: 'You can only delete your own blog' });
    }

    await blog.destroy();
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete blog', error: error.message });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
