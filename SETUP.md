⚡ Quick Setup Guide
1. Install Dependencies
npm run install-all

2. Create PostgreSQL Database

Open pgAdmin

Create → Database → name it portfolio_cms

3. Add .env File
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=portfolio_cms
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=random_secret_string

EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=app_password
EMAIL_TO=your_receiving_email@gmail.com

CLIENT_URL=http://localhost:3000

4. Start App
npm run dev

5. Access App

Website → http://localhost:3000

Admin Login → http://localhost:3000/admin/login

6. Change Default Password

Go to Settings and update your password.