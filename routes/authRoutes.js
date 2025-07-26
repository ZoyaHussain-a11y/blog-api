const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.get('/users', authController.getAllUsers);
router.get('/users/:id', authController.getUserById);
router.put('/users/:id', authMiddleware, authController.updateUser); // 🔐 Protected
router.delete('/users/:id', authController.deleteUser);

module.exports = router;
