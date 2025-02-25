# 🎶 Choir Portal - Project Overview

## ✅ What's New:

- Implemented **NextAuth.js** for authentication (`app/api/auth/[...nextauth]/route.ts`).
- Configured **Prisma Adapter** for authentication.
- Added **User Management** using the `User` model.
- Implemented **Role-Based Access Control** (RBAC) for restricted access.
- Created a service layer for:
  - Adding users
  - Assigning roles
  - Deleting users
- Implemented **Event Management**:
  - Admins can create events (Services, Rehearsals) with name, type, and start time.

## 🔨 Implemented API Services

- **User Services**:
  - `getUsers`: Get a list of all users.
  - `addUser`: Add a new user to the system.
  - `getUserById`: Retrieve user details by ID.
  - `assignRole`: Assign a role to a user.
  - `deleteUser`: Remove a user by ID.

- **Event Services**:
  - `createEvent`: Allows admins to create events.
  - `getEvents`: Retrieve a list of all events.
  
---

## 🔗 Database Schema (Prisma)

```prisma
model User {
  id          String   @id @default(uuid())
  name        String
  email       String   @unique
  password    String
  isActive    Boolean  @default(false)
  roles       UserRole[]
  teams       UserTeam[]
  events      Event[]
}

model Event {
  id          String   @id @default(uuid())
  name        String
  type        String
  startTime   DateTime
  createdAt   DateTime @default(now())
}

model Role {
  id   String @id @default(uuid())
  name String @unique
}
