// middlewares/errorMiddleware.js

const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.stack || err.message || err);

    res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};

module.exports = { errorHandler };
