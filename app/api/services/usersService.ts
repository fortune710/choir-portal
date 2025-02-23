import prisma from "@/lib/prisma";

/*
Get all users (Previously Members)
 */
 export async function getUsers() {
  return await prisma.user.findMany({
    include: { roles: true, teams: true },
  });
}

/* 
Add a new user
 */
export async function addUser(data: { name: string; email: string; password: string }) {
  return await prisma.user.create({ data });
}

/*
Get a user by ID
 */
export async function getUserById(id: string) {
  return await prisma.user.findUnique({ where: { id }, include: { roles: true, teams: true } });
}

/*
Assign a role to a user
 */
export async function assignRole(userId: string, roleId: string) {
  return await prisma.userRole.create({ data: { userId, roleId } });
}


/*
 Assign a user to a team
 */
export async function assignUserToTeam(userId: string, teamId: string) {
  return await prisma.userTeam.create({ data: { userId, teamId } });
}


/* 
Delete a member by ID
 */
export async function deleteMember(id: string) {
  return await prisma.member.delete({ where: { id } });
}
