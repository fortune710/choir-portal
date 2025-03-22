'use client'

import { assignSong as assignSongToEvent } from '@/actions/events'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Calendar } from 'lucide-react'
import { format } from 'date-fns'

interface AssignEventDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  songId: string
  songTitle: string
}

async function fetchAvailableEvents(songId: string) {
  const response = await fetch(`/api/songs/${songId}/available-events`)
  if (!response.ok) throw new Error('Failed to fetch events')
  return await response.json()
}

export default function AssignEventDialog({
  open,
  onOpenChange,
  songId,
  songTitle,
}: AssignEventDialogProps) {
  const queryClient = useQueryClient()

  const { data: events, isLoading } = useQuery({
    queryKey: ['availableEvents', songId],
    queryFn: () => fetchAvailableEvents(songId),
    enabled: open,
  })

  const { mutate: assignEvent } = useMutation({
    mutationFn: (eventId: string) => assignSongToEvent(songId, eventId),
    onSuccess: () => {
      toast.success('Song assigned to event')
      queryClient.invalidateQueries({ queryKey: ['songEvents', songId] })
    },
    onError: () => toast.error('Failed to assign song to event'),
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Assign {songTitle} to Events</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[400px] pr-4">
          {isLoading ? (
            <div>Loading events...</div>
          ) : (
            <div className="space-y-2">
              {events?.map((event: any) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-2 rounded-lg border"
                >
                  <div>
                    <p className="font-medium">{event.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(event.date), 'PPP')}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => assignEvent(event.id)}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Assign
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}