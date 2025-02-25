import prisma from "@/lib/prisma";

export async function getUsers() {
  return await prisma.user.findMany();
}

export async function assignRole(userId: string, role: string) {
  const roleRecord = await prisma.role.findUnique({ where: { name: role } });

  if (!roleRecord) {
    throw new Error("Role not found");
  }

  return await prisma.userRole.create({
    data: {
      userId,
      roleId: roleRecord.id,
    },
  });
}
