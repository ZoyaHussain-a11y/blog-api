const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const { errorHandler } = require('./middlewares/errorMiddleware');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Session middleware (must be above routes)
app.use(
  session({
    secret: 'your-secret-key', // better to use process.env.SESSION_SECRET
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({ db }),
    cookie: {
      secure: false, // true in production (HTTPS)
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', blogRoutes);

// Error handler
app.use(errorHandler);

// Sync DB and start server
db.sync({ alter: true })
  .then(() => {
    console.log("Database synced successfully");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("DB Sync Error:", err);
  });
