# Portfolio Website with CMS

A full-stack portfolio website with an integrated Content Management System (CMS). Built with React, Node.js, Express, and PostgreSQL.

## Features

- **Portfolio Website**
  - Responsive design that works on all devices
  - Project showcase with images, descriptions, and links
  - Blog section with featured posts
  - Contact form with email notifications
  - Modern, attractive UI

- **CMS Dashboard** (Integrated in same web app)
  - Secure admin authentication (username/password not exposed)
  - Manage projects (CRUD operations)
  - Manage blog posts (CRUD operations)
  - View and manage contact messages
  - Site settings and theme customization
  - Dashboard with statistics

- **Backend Features**
  - RESTful API with Express.js
  - PostgreSQL database (works with pgAdmin)
  - JWT-based authentication
  - Email notifications via Nodemailer
  - Input validation and error handling

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- pgAdmin (for database management)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ZarinPortfolio-cms
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```
   This will install dependencies for both server and client.

3. **Set up PostgreSQL database**
   - Open pgAdmin
   - Create a new database named `portfolio_cms`
   - Note your database credentials (host, port, username, password)

4. **Configure environment variables**
   - Create a `.env` file in the root directory
   - Copy the following template and fill in your values:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Database Configuration (PostgreSQL)
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=portfolio_cms
   DB_USER=postgres
   DB_PASSWORD=your_password_here

   # JWT Secret
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

   # Email Configuration (for contact form)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password_here
   EMAIL_TO=your_receiving_email@gmail.com

   # Frontend URL
   CLIENT_URL=http://localhost:3000
   ```

5. **Start the application**
   ```bash
   npm run dev
   ```
   This will start both the backend server (port 5000) and frontend (port 3000).

   Or start them separately:
   ```bash
   # Terminal 1 - Backend
   npm run server

   # Terminal 2 - Frontend
   npm run client
   ```

## Default Admin Credentials

After the first run, a default admin user is created:
- **Username:** `admin`
- **Password:** `adminzarin@zarin5678`

⚠️ **IMPORTANT:** Change the default password immediately after first login through the admin dashboard!

## Usage

### Accessing the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **Admin Login:** http://localhost:3000/admin/login

### Admin Dashboard

1. Navigate to `/admin/login`
2. Login with your admin credentials
3. Access the CMS dashboard to:
   - Add/Edit/Delete projects
   - Create and manage blog posts
   - View contact form submissions
   - Customize site settings and theme

### Database Management

The application automatically creates all necessary tables on first run. You can manage the database using pgAdmin:

- **Tables created:**
  - `users` - Admin user accounts
  - `projects` - Portfolio projects
  - `blog_posts` - Blog articles
  - `contact_messages` - Contact form submissions
  - `settings` - Site configuration

## Project Structure

```
ZarinPortfolio-cms/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   │   └── admin/     # Admin dashboard pages
│   │   ├── context/       # React context (Auth)
│   │   ├── utils/         # Utility functions
│   │   └── App.js
│   └── package.json
├── server/                 # Node.js backend
│   ├── config/            # Database configuration
│   ├── middleware/        # Auth middleware
│   ├── routes/            # API routes
│   └── index.js           # Server entry point
├── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify token
- `POST /api/auth/change-password` - Change password

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (admin)
- `PUT /api/projects/:id` - Update project (admin)
- `DELETE /api/projects/:id` - Delete project (admin)

### Blog
- `GET /api/blog` - Get published posts
- `GET /api/blog/all` - Get all posts (admin)
- `GET /api/blog/:slug` - Get single post
- `POST /api/blog` - Create post (admin)
- `PUT /api/blog/:id` - Update post (admin)
- `DELETE /api/blog/:id` - Delete post (admin)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all messages (admin)
- `PUT /api/contact/:id/read` - Mark as read (admin)
- `DELETE /api/contact/:id` - Delete message (admin)

### Settings
- `GET /api/settings` - Get settings
- `PUT /api/settings` - Update settings (admin)

### Admin
- `GET /api/admin/stats` - Get dashboard statistics (admin)

## Security Features

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- Admin routes protected with authentication middleware
- Input validation on all forms
- SQL injection protection via parameterized queries

## Email Configuration

To enable email notifications for contact form submissions:

1. For Gmail:
   - Enable 2-factor authentication
   - Generate an App Password
   - Use the App Password in `EMAIL_PASS`

2. Update `.env` with your email credentials

## Development

- The app uses `concurrently` to run both server and client
- Backend uses `nodemon` for auto-restart during development
- Frontend uses Create React App with hot reload

## Production Build

```bash
# Build React app
npm run build

# Set NODE_ENV=production in .env
# The server will serve the built React app
```

## Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running
- Check database credentials in `.env`
- Ensure database `portfolio_cms` exists

### Port Already in Use
- Change `PORT` in `.env` for backend
- Change port in `client/package.json` scripts for frontend

### Admin Login Not Working
- Check if default admin user was created (check database)
- Verify JWT_SECRET is set in `.env`

## License

ISC

## Support

For issues or questions, please contact the development team.



