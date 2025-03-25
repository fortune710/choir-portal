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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { toast } from "sonner"
import { editUser } from "@/actions/members"
import { format } from "date-fns"

interface EditMemberDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  member: {
    id: string
    name: string
    email: string
    phone_number: string
    birthday?: Date | null
    vocalCategory?: string | null
  }
}

export default function EditMemberDialog({
  open,
  onOpenChange,
  member,
}: EditMemberDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    try {
      setIsSubmitting(true)
      const result = await editUser(member.id, formData)

      if (result.success) {
        toast.success('Member updated successfully')
        onOpenChange(false)
      } else {
        toast.error(result.error || 'Failed to update member')
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
          <DialogTitle>Edit Member</DialogTitle>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={member.name}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={member.email}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone_number">Phone Number</Label>
            <Input
              id="phone_number"
              name="phone_number"
              defaultValue={member.phone_number}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthday">Birthday</Label>
            <Input
              id="birthday"
              name="birthday"
              type="date"
              defaultValue={member.birthday ? format(new Date(member.birthday), 'yyyy-MM-dd') : ''}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vocal_category">Vocal Category</Label>
            <Select name="vocal_category" defaultValue={member.vocalCategory || ''}>
              <SelectTrigger>
                <SelectValue placeholder="Select vocal category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='soprano'>Soprano</SelectItem>
                <SelectItem value='alto'>Alto</SelectItem>
                <SelectItem value='tenor'>Tenor</SelectItem>
                <SelectItem value='bass'>Bass</SelectItem>
              </SelectContent>
            </Select>
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