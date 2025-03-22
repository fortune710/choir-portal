import prisma from "@/lib/prisma";

/*
  Get all teams with their members
 */
export async function getTeams() {
  return await prisma.team.findMany({
    include: {
      users: {
        include: {
          user: true, // Fetch user details for each team
        },
      },
    },
  });
}

/*
  Add a new team
 */
export async function addTeam(data: { name: string; description?: string, coordinator: string }) {
  const { coordinator,  ...rest } = data;
  return await prisma.team.create({ 
    data: {
      ...rest,
      coordinator_user_id: coordinator,
    } 
  });
}

/*
Get a single team by ID, including users
 */
export async function getTeamById(id: string) {
  return await prisma.team.findUnique({
    where: { id },
    include: {
      users: {
        include: {
          user: true,
        },
      },
    },
  });
}

/*
 Assign a user to a team (Many-to-Many Relationship)
 */
export async function assignUserToTeam(userId: string, teamId: string) {
  return await prisma.userTeam.create({
    data: { userId, teamId },
  });
}

/*
Remove a user from a team
 */
export async function removeUserFromTeam(userId: string, teamId: string) {
  return await prisma.userTeam.deleteMany({
    where: { userId, teamId },
  });
}

/*
Update an existing team
 */
export async function updateTeam(id: string, data: { name?: string; description?: string }) {
  return await prisma.team.update({ where: { id }, data });
}

/*
Delete a team by ID
 */
export async function deleteTeam(id: string) {
  return await prisma.team.delete({ where: { id } });
}
