'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { toast } from "sonner"
import { updateSong } from "@/actions/songs"
import { Song } from "@prisma/client"

interface EditSongDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  song: Song
}

export default function EditSongDialog({
  open,
  onOpenChange,
  song,
}: EditSongDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    try {
      setIsSubmitting(true)

      const result = await updateSong(song.id, {
        title: formData.get('title') as string,
        artist: formData.get('artist') as string,
        link: formData.get('link') as string || null,
        mp3_url: formData.get('mp3_url') as string || null,
      })

      if (result.success) {
        toast.success('Song updated successfully')
        onOpenChange(false)
      } else {
        toast.error(result.error || 'Failed to update song')
      }
    } catch (error) {
      toast.error('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Song</DialogTitle>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              defaultValue={song.title}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="artist">Artist</Label>
            <Input
              id="artist"
              name="artist"
              defaultValue={song.artist}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="link">YouTube Link (Optional)</Label>
            <Input
              id="link"
              name="link"
              type="url"
              defaultValue={song.link || ''}
              placeholder="https://youtube.com/..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mp3_url">Sheet Music URL (Optional)</Label>
            <Input
              id="mp3_url"
              name="mp3_url"
              type="url"
              defaultValue={song.mp3_url || ''}
              placeholder="https://example.com/sheet-music.pdf"
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}