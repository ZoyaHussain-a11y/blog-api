const { User } = require('../models');
const bcrypt = require('bcrypt');

// Register
const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const userExists = await User.findOne({ where: { username } });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword });

    res.status(201).json({
      message: "User registered",
      user: {
        id: newUser.id,
        username: newUser.username,
        password: newUser.password,
        updatedAt: newUser.updatedAt,
        createdAt: newUser.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Set user ID in session
    req.session.userId = user.id;

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        password: user.password,
        updatedAt: user.updatedAt,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'password', 'createdAt', 'updatedAt']
    });

    res.status(200).json({
      message: "All users retrieved successfully",
      users
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve users", error: error.message });
  }
};

// Get User by ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user", error: error.message });
  }
};

// Update User
const updateUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = username || user.username;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: {
        id: user.id,
        username: user.username,
        password: user.password,
        updatedAt: user.updatedAt,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};

const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: "Logout failed", error: err.message });
    }
    res.clearCookie('connect.sid');
    res.status(200).json({ message: "Logout successful" });
  });
};

module.exports = {
  register,
  login,
  logout, // add here
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};

