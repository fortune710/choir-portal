'use server'

import { 
    assignMemberToEvent, 
    removeMemberFromEvent, 
    assignManyMembersToEvent,
    removeManyMembersFromEvent
} from "@/services/eventMemberService";
import { revalidatePath } from "next/cache";

export async function assignMember(eventId: string, memberId: string) {
    try {
        // Validate inputs
        if (!eventId || !memberId) {
            return {
                success: false,
                error: "Event ID and Member ID are required"
            };
        }

        await assignMemberToEvent(memberId, eventId);
        revalidatePath('/events');
        return { success: true };
    } catch (error) {
        console.error('Error assigning member to event:', error);
        return {
            success: false,
            error: 'Failed to assign member to event'
        };
    }
}

export async function removeMember(eventId: string, memberId: string) {
    try {
        // Validate inputs
        if (!eventId || !memberId) {
            return {
                success: false,
                error: "Event ID and Member ID are required"
            };
        }

        await removeMemberFromEvent(memberId, eventId);
        revalidatePath('/events');
        return { success: true };
    } catch (error) {
        console.error('Error removing member from event:', error);
        return {
            success: false,
            error: 'Failed to remove member from event'
        };
    }
}

export async function assignManyMembers(eventId: string, memberIds: string[]) {
    try {
        // Validate inputs
        if (!eventId || !memberIds.length) {
            return {
                success: false,
                error: "Event ID and at least one Member ID are required"
            };
        }

        const memberAssignments = memberIds.map(memberId => ({
            eventId,
            memberId
        }));

        await assignManyMembersToEvent(memberAssignments);
        revalidatePath('/events');
        return { success: true };
    } catch (error) {
        console.error('Error assigning multiple members to event:', error);
        return {
            success: false,
            error: 'Failed to assign members to event'
        };
    }
}

export async function removeManyMembers(eventId: string, memberIds: string[]) {
    try {
        // Validate inputs
        if (!eventId || !memberIds.length) {
            return {
                success: false,
                error: "Event ID and at least one Member ID are required"
            };
        }

        await removeManyMembersFromEvent(memberIds, eventId);
        revalidatePath('/events');
        return { success: true };
    } catch (error) {
        console.error('Error removing multiple members from event:', error);
        return {
            success: false,
            error: 'Failed to remove members from event'
        };
    }
}

export async function assignMemberToManyEvents(memberId: string, eventIds: string[]) {
    try {
        // Validate inputs
        if (!memberId || !eventIds.length) {
            return {
                success: false,
                error: "Member ID and at least one Event ID are required"
            };
        }

        const memberAssignments = eventIds.map(eventId => ({
            eventId,
            memberId
        }));

        await assignManyMembersToEvent(memberAssignments);
        revalidatePath('/events');
        return { success: true };
    } catch (error) {
        console.error('Error assigning member to multiple events:', error);
        return {
            success: false,
            error: 'Failed to assign member to events'
        };
    }
}