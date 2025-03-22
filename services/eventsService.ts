import prisma from "@/lib/prisma";
import { Events } from "@prisma/client";
import { startOfMonth, endOfMonth, addWeeks, isBefore } from "date-fns";

export async function createRecurringEvent(data: {
  name: string;
  description: string;
  type: "REHEARSAL" | "SERVICE" | "AUXILIARY";
  date: Date;
  startTime: Date;
  endTime: Date;
  eventLeadUserId: string;
  recurrenceEndDate: Date;
}) {
  // Create the parent event
  const parentEvent = await prisma.events.create({
    data: {
      ...data,
      isRecurring: true,
      recurrenceRule: "WEEKLY",
    },
  });

  // Generate recurring events
  const recurringEvents = [];
  let currentDate = addWeeks(data.date, 1); // Start from next week

  while (isBefore(currentDate, data.recurrenceEndDate)) {
    // Calculate new times based on the current date
    const newStartTime = new Date(currentDate);
    newStartTime.setHours(
      data.startTime.getHours(),
      data.startTime.getMinutes()
    );

    const newEndTime = new Date(currentDate);
    newEndTime.setHours(
      data.endTime.getHours(),
      data.endTime.getMinutes()
    );

    recurringEvents.push({
      name: data.name,
      description: data.description,
      type: data.type,
      date: currentDate,
      startTime: newStartTime,
      endTime: newEndTime,
      eventLeadUserId: data.eventLeadUserId,
      isRecurring: true,
      recurrenceRule: "WEEKLY",
      parentEventId: parentEvent.id,
    });

    currentDate = addWeeks(currentDate, 1);
  }

  // Create all recurring events in a transaction
  await prisma.$transaction(
    recurringEvents.map(eventData =>
      prisma.events.create({ data: eventData })
    )
  );

  return parentEvent;
}

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

interface CreateEvent extends Omit<Events, "id" | "createdAt" | "isRecurring" | "childEvents" | 
"eventLeadUserId" | "recurrenceRule" | "recurrenceRule" | "parentEventId" | "parent" | "eventLead" | 
"teams" | "songs" | "recurrenceEndDate"> {}

export async function createEvent(data: CreateEvent) {
  return await prisma.events.create({ 
    data: {
      ...data,
      isRecurring: false,
    }
  });
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
  data: Partial<Events>
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

/*
  Assign a song to an event
 */
  export async function assignSongToEvent(songId: string, eventId: string) {
    return await prisma.eventSong.create({
      data: { songId, eventId },
    });
  }
  
  /*
    Remove a song from an event
   */
  export async function removeSongFromEvent(songId: string, eventId: string) {
    return await prisma.eventSong.deleteMany({
      where: { songId, eventId },
    });
  }
  
  /*
    Get all songs for an event
   */
  export async function getEventSongs(eventId: string) {
    return await prisma.eventSong.findMany({
      where: { eventId },
      include: {
        song: true,
      },
    });
  }

  /*
  Get all events that don't have this song assigned
 */
export async function getEventsWithoutSong(songId: string) {
  const eventsWithSong = await prisma.eventSong.findMany({
    where: { songId },
    select: { eventId: true },
  });

  const eventIds = eventsWithSong.map(es => es.eventId);

  return await prisma.events.findMany({
    where: {
      id: { notIn: eventIds },
    },
    orderBy: {
      date: 'asc',
    },
  });
}
