# 🎵 Choir Portal - Backend Overview

## 📌 Project Description
The **Choir Portal** is a system for managing choir members, teams, and songs. It allows:
- User authentication with **JWT-based authentication**.
- Management of **users (formerly members)**, **teams**, and **songs**.
- Users can **have multiple roles** (Admin, Singer, etc.).
- Users can **belong to multiple teams** (Many-to-Many relationship).
- Songs now support **YouTube links (`link`) and downloadable MP3s (`mp3_url`)**.

---

## 📂 Project Structure
app/ ├── api/ # API Routes for handling backend logic (Only for POST, PUT, DELETE) │ ├── auth/ │ │ ├── login/ # Login API │ │ ├── register/ # Register API │ ├── teams/ # Teams API (for adding/removing users in teams) │ ├── roles/ # Roles API (for managing user roles) │ ├── songs/ # Songs API (for managing songs) ├── members/ │ ├── page.tsx # Members Page (Now Users) ├── teams/ │ ├── page.tsx # Teams Page ├── songs/ │ ├── page.tsx # Songs Page services/ # Business Logic Layer (Service Functions) ├── usersService.ts # (Updated) Replaces membersService.ts ├── teamsService.ts # (Updated) Handles Team-User Many-to-Many Relationship ├── songsService.ts # (Updated) Supports YouTube & MP3 links db/ # Database Configuration ├── prisma.ts # Prisma Database Connection prisma/ # Prisma ORM Configuration ├── schema.prisma # Updated Database Schema .env.local # Environment Variables .gitignore # Git Ignore File next.config.ts # Next.js Configuration package.json # Project Dependencies

kotlin
Copy
Edit

---

## **🛠️ Database Schema (Updated)**
The new **Prisma schema** now:
- ✅ **Merges Members into Users**
- ✅ **Adds Roles table for user permissions**
- ✅ **Allows Users to be in multiple Teams**
- ✅ **Adds YouTube (`link`) & MP3 (`mp3_url`) to Songs**

```prisma
model User {
  id          String   @id @default(uuid()) 
  name        String
  email       String   @unique
  password    String
  created_at  DateTime @default(now())

  // Relations
  teams       UserTeam[]
  roles       UserRole[]
}

model Team {
  id          String   @id @default(uuid()) 
  name        String
  description String?
  created_at  DateTime @default(now())

  users       UserTeam[]
}

model UserTeam {
  id      String @id @default(uuid())
  userId  String
  teamId  String

  user    User @relation(fields: [userId], references: [id])
  team    Team @relation(fields: [teamId], references: [id])

  @@unique([userId, teamId])
}

model Role {
  id   String @id @default(uuid())
  name String @unique

  users UserRole[]
}

model UserRole {
  id     String @id @default(uuid())
  userId String
  roleId String

  user   User @relation(fields: [userId], references: [id])
  role   Role @relation(fields: [roleId], references: [id])

  @@unique([userId, roleId])
}

model Song {
  id       String   @id @default(uuid()) 
  title    String
  artist   String
  link     String?  // ✅ YouTube link
  mp3_url  String?  // ✅ Downloadable MP3 link
  created_at DateTime @default(now())
}
🚀 Features Implemented
🔹 Authentication
JWT-based authentication (auth.ts)
Login (api/auth/login)
Registration (api/auth/register)
Get authenticated user (api/auth/me)
🔹 User Management
Users (formerly members) can have multiple roles.
Users can be in multiple teams.
Admins can create new roles (api/roles).
🔹 Team Management
Users can join or leave teams (services/teamsService.ts).
Many-to-Many relationship for Users ↔ Teams.
🔹 Songs Management
Songs now include:
YouTube link (link)
MP3 download (mp3_url)
CRUD operations for songs (services/songsService.ts).
🚀 How to Run the Project
1️⃣ Clone the Repository
sh
Copy
Edit
git clone https://github.com/ronalking182/choir-portal.git
cd choir-portal
2️⃣ Install Dependencies
sh
Copy
Edit
npm install
3️⃣ Set Up the Database
Configure .env.local with your PostgreSQL database URL:
sh
Copy
Edit
DATABASE_URL="postgresql://user:password@localhost:5432/choir_db"
Run Prisma Migrations:
sh
Copy
Edit
npx prisma migrate dev --name init
4️⃣ Start the Development Server
sh
Copy
Edit
npm run dev
🚀 The app should be running at http://localhost:3000.

✅ API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login and get JWT Token
GET	/api/auth/me	Get current authenticated user
Users
Method	Endpoint	Description
GET	/api/users	Get all users
GET	/api/users/:id	Get user by ID
POST	/api/users/assign-role	Assign a role to a user
Teams
Method	Endpoint	Description
GET	/api/teams	Get all teams
POST	/api/teams	Create a new team
POST	/api/teams/add-user	Add user to team
Songs
Method	Endpoint	Description
GET	/api/songs	Get all songs
POST	/api/songs	Add new song (with YouTube & MP3 link)
📌 Next Steps
🔹 Test API Endpoints with Postman or Prisma Studio
🔹 Ensure Frontend Integration Works
🔹 Review & Merge the Updated Code

🚀 Summary
✅ Updated README to match schema & API changes
✅ Added steps to set up and run the project
✅ Clearly outlined features and API endpoints

