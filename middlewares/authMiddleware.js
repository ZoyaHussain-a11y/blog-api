// middlewares/authMiddleware.js

const authMiddleware = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ message: 'Only logged-in users can create blogs' });
  }

  req.user = { id: req.session.userId };
  next();
};

module.exports = authMiddleware;
