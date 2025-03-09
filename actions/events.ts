'use server'

import { createEvent, assignTeamToEvent, removeTeamFromEvent } from "@/services/eventsService";
import { revalidatePath } from "next/cache";
import { eventSchema } from "@/lib/validations/event";
import { fromZodError } from 'zod-validation-error';
import { ZodError } from "zod";

export async function createNewEvent(formData: FormData) {
    try {
        const data = {
            name: formData.get("name"),
            description: formData.get("description"),
            type: formData.get("type"),
            date: formData.get("date"),
            startTime: formData.get("startTime"),
            endTime: formData.get("endTime"),
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

export async function assignTeamsToEvent(eventId: string, teamIds: string[]) {
    try {
        // Validate inputs
        if (!eventId || !teamIds.length) {
            return {
                success: false,
                error: "Invalid input parameters"
            };
        }

        // Create all team assignments in parallel
        await Promise.all(
            teamIds.map(teamId => assignTeamToEvent(teamId, eventId))
        );

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
        await removeTeamFromEvent(teamId, eventId);
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