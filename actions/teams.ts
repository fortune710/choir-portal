'use server'

import { revalidatePath } from "next/cache";
import { 
    addTeam, 
    deleteTeam as deleteTeamById, 
    assignUserToTeam, 
    removeUserFromTeam,
    updateTeam as updateTeamById
} from "@/services/teamsService";

export async function createTeam(formData: FormData) {
    try {
        const teamName = formData.get("name")?.toString() ?? "";
        const description = formData.get("description")?.toString();
        const coordinator = formData.get("team_coordinator")?.toString() ?? "";
        
        await addTeam({
            name: teamName,
            description,
            coordinator
        });

        revalidatePath('/teams');
        return { success: true };
    } catch (error) {
        console.error('Error creating team:', error);
        return { success: false, error: 'Failed to create team' };
    }
}

export async function assignMemberToTeam(userId: string, teamId: string) {
    try {
        await assignUserToTeam(userId, teamId);
        revalidatePath('/teams');
        return { success: true };
    } catch (error) {
        console.error('Error assigning member to team:', error);
        return { success: false, error: 'Failed to assign member to team' };
    }
}

export async function removeMemberFromTeam(userId: string, teamId: string) {
    try {
        await removeUserFromTeam(userId, teamId);
        revalidatePath('/teams');
        return { success: true };
    } catch (error) {
        console.error('Error removing member from team:', error);
        return { success: false, error: 'Failed to remove member from team' };
    }
}

export async function updateTeam(teamId: string, data: { name?: string; description?: string, coordinatorId?: string }) {
    try {
        const { coordinatorId, ...rest } = data;
        await updateTeamById(teamId, { ...rest, coordinator_user_id: coordinatorId });
        revalidatePath('/teams');
        return { success: true };
    } catch (error) {
        console.error('Error updating team:', error);
        return { success: false, error: 'Failed to update team' };
    }
}

export async function deleteTeam(teamId: string) {
    try {
        await deleteTeamById(teamId);
        revalidatePath('/teams');
        return { success: true };
    } catch (error) {
        console.error('Error deleting team:', error);
        return { success: false, error: 'Failed to delete team' };
    }
}