Blog Management REST API
This is a RESTful Blog Management API built using Node.js, Express.js, MySQL, and Sequelize. It allows users to register, log in, and perform CRUD operations on blog posts. Each user can manage only their own blogs.

Features
User registration and login (without JWT)

User CRUD operations

Blog CRUD operations

Image upload using Multer

Input validation and error handling

Sequelize ORM for MySQL

Clean modular folder structure

Folder Structure
config/ – Database configuration

controllers/ – Logic for authentication and blog operations

models/ – Sequelize models (user.js, blog.js)

routes/ – API routes for users and blogs

middlewares/ – Custom middlewares

uploads/ – Stores uploaded images

server.js – Entry point

Environment Variables (.env)
ini
Copy
Edit
DB_NAME=blog_db  
DB_USER=root  
DB_PASSWORD=  
DB_HOST=localhost  
PORT=4000
API Endpoints
Authentication Routes (/api/auth)
POST /api/auth/register

POST /api/auth/login

User Routes (/api/users)
GET /api/users

GET /api/users/:id

PUT /api/users/:id

DELETE /api/users/:id

Blog Routes (/api/blogs)
POST /api/blogs

GET /api/blogs

GET /api/blogs/:id

PUT /api/blogs/:id

DELETE /api/blogs/:id

Sample URLs for Testing (with Postman)
User Authentication
POST http://localhost:4000/api/auth/register

POST http://localhost:4000/api/auth/login

User Management
GET http://localhost:4000/api/users

GET http://localhost:4000/api/users/1

PUT http://localhost:4000/api/users/1

DELETE http://localhost:4000/api/users/1

Blog Management
POST http://localhost:4000/api/blogs

GET http://localhost:4000/api/blogs

GET http://localhost:4000/api/blogs/1

PUT http://localhost:4000/api/blogs/1

DELETE http://localhost:4000/api/blogs/1

Use Postman to test with correct methods (POST, GET, PUT, DELETE) and required JSON or form-data payloads.

Running the Project Locally
Clone the repository
git clone <your-repo-url>
cd blog-api

Install dependencies
npm install

Set up the MySQL database

Create a database named blog_db

Update .env with correct DB credentials

Run the server
node server.js

Base URL
The API runs at:
http://localhost:4000
