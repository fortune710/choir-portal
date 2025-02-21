import prisma from "@/lib/prisma";

/*
 Get all members from the database
 */
 export async function getUsers() {
  return await prisma.user.findMany({
    include: { roles: true, teams: true },
  });
}

/* 
Add a new member
 */
export async function addMember(data: { name: string; role: string }) {
  return await prisma.member.create({ data });
}

/*
Get a single member by ID
 */
export async function getMemberById(id: string) {
  return await prisma.member.findUnique({ where: { id } });
}

/*
Update an existing member
 */
export async function updateMember(id: string, data: { name?: string; role?: string }) {
  return await prisma.member.update({ where: { id }, data });
}

/* 
Delete a member by ID
 */
export async function deleteMember(id: string) {
  return await prisma.member.delete({ where: { id } });
}
