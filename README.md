📌 Portfolio Website with CMS

A complete full-stack portfolio website combined with an integrated CMS.
Built using React, Node.js, Express, and PostgreSQL.

✨ Features

🔹 Portfolio Website

Fully responsive layout

Project showcase with images, descriptions, and links

Blog section with featured posts

Contact form with email notifications

Clean and modern UI

🔹 CMS Dashboard (built inside the same application)

Secure admin authentication

Manage:

Projects (CRUD)

Blog posts (CRUD)

Skills (CRUD) 

Contact messages

Site settings

Dashboard with important statistics

🔹 Backend Features

REST API built with Express

PostgreSQL database

JWT-based authentication

Email sending via Nodemailer

Proper validation & error handling

📦 Prerequisites

Node.js (v14+)

PostgreSQL

pgAdmin (optional for DB management)

npm or yarn

⚙️ Installation Guide
1. Clone the Repository
git clone <repository-url>
cd ZarinPortfolio-cms

2. Install Dependencies
npm run install-all

3. Set up PostgreSQL

Open pgAdmin

Create a new database named: portfolio_cms

Keep your DB credentials ready

4. Create .env File

Copy this and fill in your information:

PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=portfolio_cms
DB_USER=postgres
DB_PASSWORD=your_database_password

JWT_SECRET=your_random_secret

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
EMAIL_TO=your_receiving_email@gmail.com

CLIENT_URL=http://localhost:3000


⚠️ Make sure your secrets & passwords are not shared publicly.

5. Run the Project
npm run dev


Or run them separately:

# Backend
npm run server

# Frontend
npm run client

👤 Default Admin

A default admin account is automatically created on first run.
→ Change your password immediately from the settings page.

🚀 How to Use

🔗 Access URLs

Frontend: http://localhost:3000

API: http://localhost:5000/api

Admin Login: http://localhost:3000/admin/login

Admin Dashboard Includes

Manage Projects

Manage Blog Posts

Manage Skills 

View/Respond to Contact Messages

Update Site Settings

View Statistics

🗄️ Database Structure

Tables created automatically:

users

projects

blog_posts

skills 

contact_messages

settings

📁 Project Structure


<img width="524" height="428" alt="image" src="https://github.com/user-attachments/assets/17e27c06-b3e0-4493-ba18-3589e964dde6" />

📚 API Endpoints
Auth

POST /api/auth/login

GET /api/auth/verify

POST /api/auth/change-password

Projects

GET /api/projects

POST /api/projects

PUT /api/projects/:id

DELETE /api/projects/:id

Blog

GET /api/blog

POST /api/blog

PUT /api/blog/:id

DELETE /api/blog/:id

Skills 

GET /api/skills

POST /api/skills

PUT /api/skills/:id

DELETE /api/skills/:id

Contact

POST /api/contact

GET /api/contact

DELETE /api/contact/:id

Settings

GET /api/settings

PUT /api/settings

🔒 Security

Password hashing (bcrypt)

JWT Authentication

Protected admin routes

Input validation

SQL-safe queries

📬 Email Setup

For Gmail:

Enable 2FA

Generate an App Password

Use it inside .env

🛠️ Development Notes

concurrently for running frontend + backend

nodemon for auto-restart

CRA for frontend hot reload

🚢 Production Build
npm run build


Set NODE_ENV=production and the server will serve the built React app.

❗ Troubleshooting

DB not connecting?

Check PostgreSQL is running

Check .env credentials

Port in use?

Change PORT in .env

Admin login failing?

Ensure default admin user is created

Check JWT_SECRET

📄 License

ISC
