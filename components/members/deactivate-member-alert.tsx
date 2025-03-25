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
import { deactivateMember } from "@/actions/members"
import { toast } from "sonner"
import { useState } from "react"

interface DeactivateMemberAlertProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  memberId: string
  memberName: string
}

export default function DeactivateMemberAlert({
  open,
  onOpenChange,
  memberId,
  memberName,
}: DeactivateMemberAlertProps) {
  const [isDeactivating, setIsDeactivating] = useState(false)

  const handleDeactivate = async () => {
    try {
      setIsDeactivating(true)
      const result = await deactivateMember(memberId)

      if (result.success) {
        toast.success('Member deactivated successfully')
        onOpenChange(false)
      } else {
        toast.error(result.error || 'Failed to deactivate member')
      }
    } catch (error) {
      toast.error('An unexpected error occurred')
    } finally {
      setIsDeactivating(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deactivate Member</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to deactivate {memberName}? They will no longer be able to be assigned to events or teams but their data will be preserved.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeactivate}
            disabled={isDeactivating}
          >
            {isDeactivating ? "Deactivating..." : "Deactivate"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}