'use client'

import { assignTeamsToEvent, removeTeamFromEventAction } from '@/actions/events'
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

interface ManageTeamsDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    event: {
        id: string
        name: string
    }
}

async function fetchEvent(eventId: string) {
    const response = await fetch(`/api/events/${eventId}`)
    if (!response.ok) {
        throw new Error('Failed to fetch event')
    }
    return response.json()
}

async function fetchTeams() {
    const response = await fetch('/api/teams')
    if (!response.ok) {
        throw new Error('Failed to fetch teams')
    }
    return response.json()
}

export default function ManageTeamsDialog({ 
    open, 
    onOpenChange, 
    event 
}: ManageTeamsDialogProps) {
    const [selectedTeamIds, setSelectedTeamIds] = useState<string[]>([])
    const queryClient = useQueryClient()

    // Fetch event details including teams
    const { data: eventData, isLoading: isLoadingEvent } = useQuery({
        queryKey: ['event', event.id],
        queryFn: () => fetchEvent(event.id),
        enabled: open,
    })

    // Fetch all available teams
    const { data: allTeams, isLoading: isLoadingTeams } = useQuery({
        queryKey: ['teams'],
        queryFn: fetchTeams,
        enabled: open,
    })

    // Mutation for assigning teams
    const { mutate: assignTeams } = useMutation({
        mutationFn: (teamIds: string[]) => assignTeamsToEvent(event.id, teamIds),
        onSuccess: () => {
            toast.success("Teams Assigned Successfully")
            setSelectedTeamIds([])
            queryClient.invalidateQueries({ queryKey: ['event', event.id] })
        },
        onError: (error: any) => {
            toast.error("Failed to assign teams", {
                description: error.message
            })
        }
    })

    // Mutation for removing a team
    const { mutate: removeTeam } = useMutation({
        mutationFn: (teamId: string) => removeTeamFromEventAction(event.id, teamId),
        onSuccess: () => {
            toast.success("Team Removed Successfully")
            queryClient.invalidateQueries({ queryKey: ['event', event.id] })
        },
        onError: (error: any) => {
            toast.error("Failed to remove team", {
                description: error.message
            })
        }
    })

    // Filter out teams that are already assigned to the event
    const availableTeams = allTeams?.filter((team: any) => 
        !eventData?.teams?.some((eventTeam: any) => eventTeam.team.id === team.id)
    ) ?? []

    if (isLoadingEvent || isLoadingTeams) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent>
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
                    <DialogTitle>Manage Teams - {event.name}</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Add Teams Section */}
                    <div className="flex items-end gap-2">
                        <div className="flex-1">
                            <Select
                                value={selectedTeamIds[0]} // For single select
                                onValueChange={(value) => setSelectedTeamIds([value])}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select team to add" />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableTeams.map((team: any) => (
                                        <SelectItem key={team.id} value={team.id}>
                                            {team.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <Button 
                            onClick={() => {
                                if (selectedTeamIds.length > 0) {
                                    assignTeams(selectedTeamIds)
                                }
                            }}
                            disabled={selectedTeamIds.length === 0}
                        >
                            Add Team
                        </Button>
                    </div>

                    {/* Current Teams List */}
                    <div>
                        <h3 className="text-sm font-medium mb-3">Assigned Teams</h3>
                        <ScrollArea className="h-[300px]">
                            <div className="space-y-2">
                                {eventData?.teams?.map((eventTeam: any) => (
                                    <div 
                                        key={eventTeam.team.id} 
                                        className="flex items-center justify-between p-2 rounded-lg border"
                                    >
                                        <div>
                                            <p className="font-medium">{eventTeam.team.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {eventTeam.team.description || 'No description'}
                                            </p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeTeam(eventTeam.team.id)}
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