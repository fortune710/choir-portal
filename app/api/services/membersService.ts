import prisma from "@/lib/prisma"

export async function getMembers() {
    return await prisma.member.findMany();
  }
  
  export async function addMember(data: { name: string; role: string }) {
    return await prisma.member.create({
      data,
    });
  }