import prisma from "@/lib/prisma";

export async function assignMemberToEvent(memberId: string, eventId: string) {
  return await prisma.eventMember.create({
    data: {
      memberId,
      eventId,
    },
  });
}

export async function removeMemberFromEvent(memberId: string, eventId: string) {
  return await prisma.eventMember.delete({
    where: {
      eventId_memberId: {
        eventId,
        memberId,
      },
    },
  });
}

export async function getEventMembers(eventId: string) {
  return await prisma.eventMember.findMany({
    where: {
      eventId,
    },
    include: {
      member: {
        select: {
          id: true,
          name: true,
          email: true,
          phone_number: true,
          avatar: true,
          vocalCategory: true,
        },
      },
    },
  });
}

export async function getMemberEvents(memberId: string) {
  return await prisma.eventMember.findMany({
    where: {
      memberId,
    },
    include: {
      event: true,
    },
  });
}

export async function isUserAssignedToEvent(memberId: string, eventId: string) {
  const assignment = await prisma.eventMember.findUnique({
    where: {
      eventId_memberId: {
        eventId,
        memberId,
      },
    },
  });
  return !!assignment;
}

// ... existing functions ...

export async function assignManyMembersToEvent(members: { memberId: string; eventId: string }[]) {
  return await prisma.eventMember.createMany({
    data: members,
    skipDuplicates: true, // Skip if member is already assigned
  });
}

export async function removeManyMembersFromEvent(memberIds: string[], eventId: string) {
  return await prisma.eventMember.deleteMany({
    where: {
      eventId,
      memberId: {
        in: memberIds
      }
    }
  });
}

export async function getEventsWithoutMember(memberId: string) {
  const eventsWithMember = await prisma.eventMember.findMany({
    where: { memberId },
    select: { eventId: true }
  });

  const eventIds = eventsWithMember.map(em => em.eventId);

  return await prisma.events.findMany({
    where: {
      id: { notIn: eventIds },
      date: { gte: new Date() } // Only future events
    },
    orderBy: { date: 'asc' }
  });
}