**Blog Management REST API**
This is a RESTful Blog Management API built with Node.js, Express.js, MySQL, and Sequelize ORM. It allows users to register, log in, and perform CRUD operations on blog posts. Each user can only manage (create, update, delete) their own blogs.

**Features**
User registration and login (without JWT)
User CRUD operations (Create, Read, Update, Delete)
Blog CRUD operations (Create, Read, Update, Delete)
Image upload for blog posts using Multer
Input validation and error handling
Sequelize-based MySQL integration
Modular folder structure

**Folder Structure**
config/ - Database configuration
controllers/ - Request handlers (authController, blogController)
models/ - Sequelize models (user, blog)
routes/ - Express route definitions (authRoutes, blogRoutes)
middlewares/ - Auth and error handling middleware
uploads/ - Stores uploaded blog images
server.js - App entry point
.env - Environment variables

**Environment Variables (.env)**
DB_NAME=blog_db
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
PORT=4000

**API Endpoints**
Authentication Routes (/api/auth)
POST /api/auth/register
Register a new user
Request Body:
{ "username": "zoya", "password": "123456" }

POST /api/auth/login
Login an existing user
Request Body:
{ "username": "zoya", "password": "123456" }

**Blog Routes (/api/blogs)**
Note: Auth middleware allows only logged-in users to manage their blogs.
POST /api/blogs
Create a new blog post (multipart/form-data with title, content, authorId, image)

GET /api/blogs
Get all blogs

GET /api/blogs/:id
Get a specific blog by ID

PUT /api/blogs/:id
Update a blog by ID (only by the blog's author)

DELETE /api/blogs/:id
Delete a blog by ID (only by the blog's author)

**Sample URLs for Testing (in Postman)**
User Authentication Urls:
POST http://localhost:4000/api/auth/register
POST http://localhost:4000/api/auth/login
GET http://localhost:4000/api/users
GET http://localhost:4000/api/users/1
PUT http://localhost:4000/api/users/1
DELETE http://localhost:4000/api/users/1

Blog Routes:

POST http://localhost:4000/api/blogs
GET http://localhost:4000/api/blogs
GET http://localhost:4000/api/blogs/1
PUT http://localhost:4000/api/blogs/1
DELETE http://localhost:4000/api/blogs/1

Use Postman to test with appropriate request types and body format (JSON or form-data).

**How to Run the Project Locally**
Clone the repository
git clone <your-repo-url>
cd blog-api
Install dependencies
npm install

**Configure the database**
Create a MySQL database named blog_db
Update .env with your DB credentials
Run migrations and start the server
node server.js

**The API will be available at:**
http://localhost:4000

