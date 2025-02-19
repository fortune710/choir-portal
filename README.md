This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


---

## ✅ **What Has Been Implemented So Far?**
### 🔹 **Backend (API Routes)**
✔ **User Authentication**
- Implemented **JWT-based authentication** (`auth.ts` in `lib/`)
- Created API Routes:
  - `api/auth/register/route.ts` → User Registration (Stores user in DB)
  - `api/auth/login/route.ts` → User Login (Verifies credentials, returns JWT)
  - `api/auth/me/route.ts` → Fetch logged-in user details (Uses JWT)

✔ **Choir Management**
- Implemented CRUD APIs for:
  - **Members** (`api/members/route.ts`) → Add and fetch members
  - **Teams** (`api/teams/route.ts`) → Add and fetch teams
  - **Songs** (`api/songs/route.ts`) → Add and fetch songs

✔ **Service Layer**
- Moved **business logic** to service files (`services/`)
  - `services/membersService.ts` → Handles member-related logic
  - `services/songsService.ts` → Handles song-related logic
  - `services/teamsService.ts` → Handles team-related logic
- Keeps API routes **clean** and **focused on request handling**

✔ **Database Setup**
- Added **Prisma ORM** for database interaction:
  - `prisma/schema.prisma` → Defines models (`User`, `Team`, `Member`, `Song`)
  - `db/prisma.ts` → Centralized **Prisma Client setup**
- **PostgreSQL setup is pending** 

---

## **🔜 Next Steps**
🔹 **Database Migration** (⚠ Not done yet)  
🔹 **User Registration Page (`register/page.tsx`)**  
🔹 **Frontend Integration with API (Connect UI to backend)**  
🔹 **Fix PostgreSQL*  

---

## **📌 Important **
- **Authentication uses JWT** (`auth.ts` in `lib/`)
- **Service Layer (`services/`) keeps API logic separate from routes**
- **until PostgreSQL is fixed, it has not been migrated yet** (until PostgreSQL is fixed)
- **Migration is pending** → Run `npx prisma migrate dev --name init` after PostgreSQL is fixed

