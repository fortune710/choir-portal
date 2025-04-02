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
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Music } from 'lucide-react'
import { useSongs } from '@/hooks/use-songs'

interface AssignSongDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  eventId: string
  eventName: string
}



export default function AssignSongDialog({
  open,
  onOpenChange,
  eventId,
  eventName,
}: AssignSongDialogProps) {
  const queryClient = useQueryClient()

  const { data: songs, isLoading } = useSongs(open);

  const { mutate: assignSong } = useMutation({
    mutationFn: (songId: string) => assignSongToEvent(songId, eventId),
    onSuccess: () => {
      toast.success('Song assigned successfully')
      queryClient.invalidateQueries({ queryKey: ['eventSongs', eventId] })
    },
    onError: () => toast.error('Failed to assign song'),
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Assign Songs to {eventName}</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[400px] pr-4">
          {isLoading ? (
            <div>Loading songs...</div>
          ) : (
            <div className="space-y-2">
              {songs?.map((song: any) => (
                <div
                  key={song.id}
                  className="flex items-center justify-between p-2 rounded-lg border"
                >
                  <div>
                    <p className="font-medium">{song.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {song.artist}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => assignSong(song.id)}
                  >
                    <Music className="h-4 w-4 mr-2" />
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