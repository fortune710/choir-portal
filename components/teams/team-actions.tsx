'use client' 

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner'
import { deleteTeam } from '@/actions/teams';
import DeleteTeamAlert from './delete-team-alert';
import EditTeamDialog from './edit-team-dialog';
import ManageMembersDialog from './manage-members-dialog';
import { Separator } from '../ui/separator';


interface TeamActionsProps {
    teamId: string;
    teamName: string;
    teamDescription: string;
    coordinatorId: string
}

export default function TeamActions({ teamId, teamName, teamDescription, coordinatorId }: TeamActionsProps) {
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
        } catch (error: any) {
            toast.error("Error Deleting Team", {
                description: error.message || "Failed to delete team"
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
                    <Button variant="outline" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <Separator/>
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
                team={{ id: teamId, name: teamName, description: teamDescription, coordinatorId }}
            />

            <ManageMembersDialog 
                open={manageMembersOpen}
                onOpenChange={setManageMembersOpen}
                team={{ id: teamId, name: teamName }}
            />
        
        </>
    )
}