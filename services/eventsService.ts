import prisma from "@/lib/prisma";
import { startOfMonth, endOfMonth } from "date-fns";

/*
  Get all events with their teams
 */
export async function getEvents() {
  return await prisma.events.findMany({
    include: {
      teams: {
        include: {
          team: true,
        },
      },
    },
    orderBy: {
      date: 'asc',
    },
  });
}

/*
  Get events for current month
 */
export async function getCurrentMonthEvents() {
  const start = startOfMonth(new Date());
  const end = endOfMonth(new Date());

  return await prisma.events.findMany({
    where: {
      date: {
        gte: start,
        lte: end,
      },
    },
    include: {
      teams: {
        include: {
          team: true,
        },
      },
    },
    orderBy: {
      date: 'asc',
    },
  });
}

/*
  Create a new event
 */
export async function createEvent(data: {
  name: string;
  description: string;
  type: "REHEARSAL" | "SERVICE" | "SPECIAL";
  date: Date;
  startTime: Date;
  endTime: Date;
}) {
  return await prisma.events.create({ data });
}

/*
  Assign a team to an event
 */
export async function assignTeamToEvent(teamId: string, eventId: string) {
  return await prisma.eventTeam.create({
    data: { teamId, eventId },
  });
}

/*
  Remove a team from an event
 */
export async function removeTeamFromEvent(teamId: string, eventId: string) {
  return await prisma.eventTeam.deleteMany({
    where: { teamId, eventId },
  });
}

/*
  Update an event
 */
export async function updateEvent(
  id: string,
  data: {
    name?: string;
    description?: string;
    type?: "REHEARSAL" | "SERVICE" | "SPECIAL";
    date?: Date;
    startTime?: Date;
    endTime?: Date;
  }
) {
  return await prisma.events.update({
    where: { id },
    data,
  });
}

/*
  Delete an event
 */
export async function deleteEvent(id: string) {
  return await prisma.events.delete({
    where: { id },
  });
}

export async function getEventById(id: string) {
    return await prisma.events.findUnique({
        where: { id },
        include: {
            teams: {
                include: {
                    team: true,
                },
            },
        },
    });
}
