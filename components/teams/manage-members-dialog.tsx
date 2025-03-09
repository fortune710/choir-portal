'use client'

import { assignMemberToTeam, removeMemberFromTeam } from '@/actions/teams'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue, 
} from '@/components/ui/select'
import { useState } from 'react'
import { toast } from 'sonner'
import { UserX } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

interface ManageMembersDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    team: {
        id: string
        name: string
    }
}

async function fetchTeam(teamId: string) {
    const response = await fetch(`/api/teams/${teamId}`)
    if (!response.ok) {
        throw new Error('Failed to fetch team')
    }
    return response.json()
}

async function fetchMembers() {
    const response = await fetch('/api/members')
    if (!response.ok) {
        throw new Error('Failed to fetch members')
    }
    return response.json()
}

export default function ManageMembersDialog({ 
    open, 
    onOpenChange, 
    team,
}: ManageMembersDialogProps) {
    const [selectedMemberId, setSelectedMemberId] = useState<string>('')
    const queryClient = useQueryClient()

    // Fetch team details including members
    const { data: teamData, isLoading: isLoadingTeam } = useQuery({
        queryKey: ['team', team.id],
        queryFn: () => fetchTeam(team.id),
        enabled: open, // Only fetch when dialog is open
    })

    // Fetch all available members
    const { data: allMembers, isLoading: isLoadingMembers } = useQuery({
        queryKey: ['members'],
        queryFn: fetchMembers,
        enabled: open, // Only fetch when dialog is open
    })

    // Add member mutation
    const { mutate: addMember } = useMutation({
        mutationFn: () => assignMemberToTeam(selectedMemberId, team.id),
        onSuccess: () => {
            toast.success("Member Added Successfully")
            setSelectedMemberId('')
            // Invalidate queries to refresh data
            queryClient.invalidateQueries({ queryKey: ['team', team.id] })
        },
        onError: (error: any) => {
            toast.error("Error Adding Member", {
                description: error.message || "Failed to add member to team"
            })
        }
    })

    // Remove member mutation
    const { mutate: removeMember } = useMutation({
        mutationFn: ({ memberId }: { memberId: string, memberName: string }) => 
            removeMemberFromTeam(memberId, team.id),
        onSuccess: (_, { memberName }) => {
            toast.success(`Removed ${memberName} from team`)
            // Invalidate queries to refresh data
            queryClient.invalidateQueries({ queryKey: ['team', team.id] })
        },
        onError: (error: any) => {
            toast.error("Error Removing Member", {
                description: error.message || "Failed to remove member from team"
            })
        }
    })

    // Filter out current team members from available members
    const nonTeamMembers = allMembers?.filter(
        (member: any) => !teamData?.users?.some(
            (teamMember: any) => teamMember.user.id === member.id
        )
    ) ?? []

    if (isLoadingTeam || isLoadingMembers) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Loading...</DialogTitle>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Manage Team Members - {team.name}</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Add Member Section */}
                    <div className="flex items-end gap-2">
                        <div className="flex-1">
                            <Select
                                value={selectedMemberId}
                                onValueChange={setSelectedMemberId}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select member to add" />
                                </SelectTrigger>
                                <SelectContent>
                                    {nonTeamMembers.map((member: any) => (
                                        <SelectItem key={member.id} value={member.id}>
                                            {member.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <Button 
                            onClick={() => addMember()}
                            disabled={!selectedMemberId}
                        >
                            Add Member
                        </Button>
                    </div>

                    {/* Current Members List */}
                    <div>
                        <h3 className="text-sm font-medium mb-3">Current Members</h3>
                        <ScrollArea className="h-[300px]">
                            <div className="space-y-2">
                                {teamData?.users?.map((teamMember: any) => (
                                    <div 
                                        key={teamMember.user.id} 
                                        className="flex items-center justify-between p-2 rounded-lg border"
                                    >
                                        <div>
                                            <p className="font-medium">{teamMember.user.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {teamMember.user.email}
                                            </p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeMember({ 
                                                memberId: teamMember.user.id,
                                                memberName: teamMember.user.name
                                            })}
                                        >
                                            <UserX className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
} 