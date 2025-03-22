'use server'

import { createEvent, deleteEvent as deleteEventDb, assignTeamToEvent, removeTeamFromEvent, assignSongToEvent, removeSongFromEvent } from "@/services/eventsService";
import { revalidatePath } from "next/cache";
import { eventSchema } from "@/lib/validations/event";
import { fromZodError } from 'zod-validation-error';
import { ZodError } from "zod";
import prisma from "@/lib/prisma";
import { assignManyMembersToEvent, removeManyMembersFromEvent } from "@/services/eventMemberService";

export async function createNewEvent(formData: FormData) {
    try {
        const data = {
            name: formData.get("name"),
            description: formData.get("description"),
            type: formData.get("type"),
            date: formData.get("date"),
            startTime: formData.get("startTime"),
            endTime: formData.get("endTime"),
            meetingUrl: formData.get("meetingUrl"),
            dressCode: formData.get("dressCode"),
            guestLead: formData.get("guestLead"),
            prayerPoints: formData.get("prayerPoints"),
        }

        // Validate the form data
        const validatedData = eventSchema.parse(data)

        // Convert time strings to Date objects
        const date = new Date(validatedData.date)
        const startTime = new Date(date)
        const [startHours, startMinutes] = validatedData.startTime.split(':')
        startTime.setHours(parseInt(startHours), parseInt(startMinutes))

        const endTime = new Date(date)
        const [endHours, endMinutes] = validatedData.endTime.split(':')
        endTime.setHours(parseInt(endHours), parseInt(endMinutes))

        // Create the event
        await createEvent({
            name: validatedData.name,
            description: validatedData.description ?? "",
            type: validatedData.type,
            date,
            startTime,
            endTime,
            meetingUrl: validatedData.meetingUrl ?? null,
            dressCode:  validatedData.dressCode ?? null,
            guestLead: validatedData.guestLead ?? null,
            prayerPoints: validatedData.prayerPoints ?? null,
        });

        revalidatePath('/events');
        return { success: true };
    } catch (error: unknown) {
        console.error('Error creating event:', error);
        if (error instanceof ZodError && error.name === 'ZodError') {
            const validationError = fromZodError(error);
            return {
                success: false,
                error: validationError.message,
            };
        }
        return { 
            success: false, 
            error: 'Failed to create event'
        };
    }
}

export async function deleteEvent(eventId: string) {
    try {
        await deleteEventDb(eventId);
        return { success: true };
    } catch (error: any) {
        console.error('Error deleting event:', error);
        return { success: false, error: error.message || 'Failed to delete event' };
    }
}

export async function assignTeamsToEvent(eventId: string, teamIds: string[]) {
    try {
        // Validate inputs
        if (!eventId || !teamIds.length) {
            return {
                success: false,
                error: "Invalid input parameters"
            };
        }

        // Get all team members for the selected teams
    const teams = await prisma.team.findMany({
        where: { id: { in: teamIds } },
        include: {
          users: {
            select: { userId: true }
          }
        }
      });
  
      // Create array of member assignments
      const memberAssignments = teams.flatMap(team => 
        team.users.map(user => ({
          eventId,
          memberId: user.userId
        }))
      );
  
      // Assign teams to event
      await Promise.all([
        // Create team assignments
        Promise.all(
          teamIds.map(teamId => assignTeamToEvent(teamId, eventId))
        ),
        // Create member assignments
        assignManyMembersToEvent(memberAssignments)
      ]);
  

        revalidatePath('/events');
        return { success: true };
    } catch (error) {
        console.error('Error assigning teams to event:', error);
        return {
            success: false,
            error: 'Failed to assign teams to event'
        };
    }
}

export async function removeTeamFromEventAction(eventId: string, teamId: string) {
    try {
        // Get all members of the team
        const teamMembers = await prisma.userTeam.findMany({
            where: { teamId },
            select: { userId: true }
        });
    
        const memberIds = teamMembers.map(tm => tm.userId);
    
        // Remove team and its members
        await Promise.all([
            removeTeamFromEvent(teamId, eventId),
            removeManyMembersFromEvent(memberIds, eventId)
        ]);
        revalidatePath('/events');
        return { success: true };
    } catch (error) {
        console.error('Error removing team from event:', error);
        return {
            success: false,
            error: 'Failed to remove team from event'
        };
    }
} 

export async function assignSong(songId: string, eventId: string) {
    try {
        // Validate inputs
        if (!songId || !eventId) {
            return {
                success: false,
                error: "Song ID and Event ID are required"
            };
        }

        await assignSongToEvent(songId, eventId);
        revalidatePath('/events');
        return { success: true };
    } catch (error) {
        console.error('Error assigning song to event:', error);
        return {
            success: false,
            error: 'Failed to assign song to event'
        };
    }
}

export async function removeSong(songId: string, eventId: string) {
    try {
        // Validate inputs
        if (!songId || !eventId) {
            return {
                success: false,
                error: "Song ID and Event ID are required"
            };
        }

        await removeSongFromEvent(songId, eventId);
        revalidatePath('/events');
        return { success: true };
    } catch (error) {
        console.error('Error removing song from event:', error);
        return {
            success: false,
            error: 'Failed to remove song from event'
        };
    }
}