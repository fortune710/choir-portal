'use client' 

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner'
import { deleteTeam } from '@/actions/teams';
import DeleteTeamAlert from './delete-team-alert';
import EditTeamDialog from './edit-team-dialog';
import ManageMembersDialog from './manage-members-dialog';


interface TeamActionsProps {
    teamId: string;
    teamName: string;
    teamDescription: string;
}

export default function TeamActions({ teamId, teamName, teamDescription }: TeamActionsProps) {
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [manageMembersOpen, setManageMembersOpen] = useState(false)
    
    const handleDeleteTeam = async () => {

        try {
            await deleteTeam(teamId)
            toast.success("Team Deleted", {
                description: `${teamName} has been deleted successfully`
            })
            setDeleteOpen(false)
        } catch (error) {
            toast.error("Error Deleting Team", {
                description: "Failed to delete team"
            })
        }
    }
    
    
    const handleAction = (
        action: 'edit' | 'members' | 'delete',
    ) => () => {
        switch (action) {
            case 'edit':
                setEditOpen(true)
                break
            case 'members':
                setManageMembersOpen(true)
                break
            case 'delete':
                setDeleteOpen(true)
                break
        }
    }

    
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleAction('edit')}>
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleAction('members')}>Manage Members</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleAction('delete')}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>


            <DeleteTeamAlert 
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                onConfirm={handleDeleteTeam}
                teamName={teamName}
            />

            <EditTeamDialog 
                open={editOpen}
                onOpenChange={setEditOpen}
                team={{ id: teamId, name: teamName, description: teamDescription }}
            />

            <ManageMembersDialog 
                open={manageMembersOpen}
                onOpenChange={setManageMembersOpen}
                team={{ id: teamId, name: teamName }}
            />
        
        </>
    )
}