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
import { deleteEvent } from "@/actions/events"
import { toast } from "sonner"

interface DeleteEventAlertProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  eventId: string
  eventName: string
}

export default function DeleteEventAlert({
  open,
  onOpenChange,
  eventId,
  eventName,
}: DeleteEventAlertProps) {

  const handleDelete = async () => {
    try {
      await deleteEvent(eventId)
      toast.success("Event deleted successfully")
    } catch (error) {
      toast.error("Failed to delete event")
    } finally {
        onOpenChange(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the event "{eventName}". This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}