'use client'

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
import { Download, X } from 'lucide-react'
import { removeSong as removeSongFromEvent } from '@/actions/events'

interface EventSongsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  eventId: string
  eventName: string
}

async function fetchEventSongs(eventId: string) {
  const response = await fetch(`/api/events/${eventId}/songs`)
  if (!response.ok) throw new Error('Failed to fetch songs')
  return response.json()
}

export default function EventSongsDialog({
  open,
  onOpenChange,
  eventId,
  eventName,
}: EventSongsDialogProps) {
  const queryClient = useQueryClient()

  const { data: songs, isLoading } = useQuery({
    queryKey: ['eventSongs', eventId],
    queryFn: () => fetchEventSongs(eventId),
    enabled: open,
  })

  const { mutate: removeSong } = useMutation({
    mutationFn: (songId: string) => removeSongFromEvent(eventId, songId),
    onSuccess: () => {
      toast.success('Song removed from event')
      queryClient.invalidateQueries({ queryKey: ['eventSongs', eventId] })
    },
    onError: () => toast.error('Failed to remove song'),
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Songs for {eventName}</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[400px] pr-4">
          {isLoading ? (
            <div>Loading songs...</div>
          ) : (
            <div className="space-y-2">
              {songs?.map((eventSong: any) => (
                <div
                  key={eventSong.song.id}
                  className="flex items-center justify-between p-2 rounded-lg border"
                >
                  <div>
                    <p className="font-medium">{eventSong.song.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {eventSong.song.artist}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {eventSong.song.mp3_url && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <a
                          href={eventSong.song.mp3_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeSong(eventSong.song.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}