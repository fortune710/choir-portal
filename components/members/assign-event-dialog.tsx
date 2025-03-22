'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Checkbox } from "@/components/ui/checkbox"
import { assignMember } from "@/actions/event-member";
import { format } from "date-fns"
import { useState } from "react"

interface AssignEventsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  memberId: string
  memberName: string
}

async function fetchAvailableEvents(memberId: string) {
  const response = await fetch(`/api/members/${memberId}/available-events`)
  if (!response.ok) throw new Error('Failed to fetch events')
  return response.json()
}

export default function AssignEventsDialog({
  open,
  onOpenChange,
  memberId,
  memberName,
}: AssignEventsDialogProps) {
  const [selectedEvents, setSelectedEvents] = useState<string[]>([])
  const queryClient = useQueryClient()

  const { data: events, isLoading } = useQuery({
    queryKey: ['availableEvents', memberId],
    queryFn: () => fetchAvailableEvents(memberId),
    enabled: open,
  })

  const { mutate: assignEvents } = useMutation({
    mutationFn: async () => {
      await Promise.all(
        selectedEvents.map(eventId => assignMember(eventId, memberId))
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memberEvents', memberId] })
      toast.success('Successfully assigned to events')
      setSelectedEvents([])
      onOpenChange(false)
    },
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Assign {memberName} to Events</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[400px] pr-4">
          {isLoading ? (
            <div>Loading events...</div>
          ) : (
            <div className="space-y-2">
              {events?.map((event: any) => (
                <div
                  key={event.id}
                  className="flex items-center space-x-3 p-2 rounded-lg border"
                >
                  <Checkbox
                    checked={selectedEvents.includes(event.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedEvents([...selectedEvents, event.id])
                      } else {
                        setSelectedEvents(selectedEvents.filter(id => id !== event.id))
                      }
                    }}
                  />
                  <div>
                    <p className="font-medium">{event.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(event.date), 'PPP')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <div className="flex justify-end mt-4">
          <Button
            onClick={() => assignEvents()}
            disabled={selectedEvents.length === 0}
          >
            Assign to Selected Events
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}