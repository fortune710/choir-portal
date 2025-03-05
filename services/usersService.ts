import prisma from "@/lib/prisma";
import { User } from "@prisma/client"

interface CreateUser extends Omit<User, 
"id" | "created_at" | "password" | "avatar" | "isActive" | "activationToken"> {}

/*
 Get all members from the database
 */
 export async function getUsers() {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone_number: true,
      avatar: true,
      roles: {
        include: {
          role: true
        },
      },
      //teams: true,

    }
  });
}

/* 
Add a new member
 */
export async function addUser(data: CreateUser) {
  return await prisma.user.create({ data });
}

/*
Get a single member by ID
 */
export async function getUserById(id: string) {
  return await prisma.user.findUnique({ where: { id } });
}

/*
Update an existing member
 */
export async function updateUser(id: string, data: Partial<CreateUser>) {
  return await prisma.user.update({ where: { id }, data });
}

/* 
Delete a member by ID
 */
export async function deleteuser(id: string) {
  return await prisma.user.delete({ where: { id } });
}
