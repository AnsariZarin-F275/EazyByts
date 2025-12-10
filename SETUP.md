# Quick Setup Guide

## Step-by-Step Setup

### 1. Install Dependencies
```bash
npm run install-all
```

### 2. Create PostgreSQL Database
1. Open pgAdmin
2. Right-click on "Databases" → Create → Database
3. Name it: `portfolio_cms`
4. Click Save

### 3. Create .env File
Create a `.env` file in the root directory with:

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=portfolio_cms
DB_USER=postgres
DB_PASSWORD=your_postgres_password

JWT_SECRET=change_this_to_a_random_secret_string

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_TO=your_receiving_email@gmail.com

CLIENT_URL=http://localhost:3000
```

**Important:** Replace:
- `your_postgres_password` with your PostgreSQL password
- `change_this_to_a_random_secret_string` with a random string (for security)
- Email credentials if you want email notifications

### 4. Start the Application  
```bash
npm run dev
```

### 5. Access the Application
- Website: http://localhost:3000
- Admin Login: http://localhost:3000/admin/login
- Default credentials:
  - Username: `admin`
  - Password: `adminzarin@zarin5678`

### 6. Change Default Password
After logging in, go to Settings and change your password immediately!

## Troubleshooting

**Database connection error?**
- Make sure PostgreSQL is running
- Check your database credentials in `.env`
- Verify the database `portfolio_cms` exists

**Port already in use?**
- Change `PORT=5000` to another port in `.env`
- Update `CLIENT_URL` accordingly

**Can't login?**
- Check if the database was initialized (tables should be created automatically)
- Verify JWT_SECRET is set in `.env`



