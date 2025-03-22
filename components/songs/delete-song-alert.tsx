'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { deleteSong } from "@/actions/songs"
import { toast } from "sonner"
import { useState } from "react"

interface DeleteSongAlertProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  songId: string
  songTitle: string
}

export default function DeleteSongAlert({
  open,
  onOpenChange,
  songId,
  songTitle,
}: DeleteSongAlertProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      const result = await deleteSong(songId)

      if (result.success) {
        toast.success('Song deleted successfully')
        onOpenChange(false)
      } else {
        toast.error(result.error || 'Failed to delete song')
      }
    } catch (error) {
      toast.error('An unexpected error occurred')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete &quot;{songTitle}&quot; and remove it from any events it&apos;s assigned to. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}