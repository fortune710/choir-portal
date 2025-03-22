'use client'

import { updateEvent } from '@/services/eventsService'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'
import { toast } from 'sonner'
import { eventSchema } from '@/lib/validations/event'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { Events } from "@prisma/client"
import { ZodError } from 'zod'

interface EditEventDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  event: Events
}

export default function EditEventDialog({
  open,
  onOpenChange,
  event,
}: EditEventDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventType, setEventType] = useState(event.type);

  // Format dates for input fields
  const formattedDate = format(new Date(event.date), 'yyyy-MM-dd')
  const formattedStartTime = format(new Date(event.startTime), 'HH:mm')
  const formattedEndTime = format(new Date(event.endTime), 'HH:mm')

  const validateForm = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      description: formData.get("description"),
      type: formData.get("type"),
      date: formData.get("date"),
      startTime: formData.get("startTime"),
      endTime: formData.get("endTime"),
    }

    const result = await eventSchema.parseAsync(data)
    return result;
  }

  const handleSubmit = async (formData: FormData) => {
    try {
      setIsSubmitting(true)

      const validatedDetails = await validateForm(formData)


      const date = new Date(formData.get('date') as string)
      const startTime = new Date(`${formData.get('date')}T${formData.get('startTime')}`)
      const endTime = new Date(`${formData.get('date')}T${formData.get('endTime')}`)

      await updateEvent(event.id, {
        name: validatedDetails.name,
        description: validatedDetails.description ?? undefined,
        type: validatedDetails.type,
        date,
        startTime,
        endTime,
      })

      toast.success("Event updated successfully")
      onOpenChange(false)
    } catch (error) {
        if (error instanceof ZodError) {
            toast.error("Validation Error", {
              description: error.message
            })
            return;
        }
        toast.error("Failed to update event", {
            description: (error as any).message,
        })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form action={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
          </DialogHeader>

          <section className="space-y-4 my-3">
            <div className='grid gap-2'>
              <Label htmlFor="name">Event Name</Label>
              <Input 
                name='name' 
                id="name" 
                defaultValue={event.name}
                required 
              />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor="description">Description</Label>
              <Textarea 
                name='description' 
                id="description"
                defaultValue={event.description} 
              />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor="type">Event Type</Label>
              <Select name="type" defaultValue={event.type} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="REHEARSAL">Rehearsal</SelectItem>
                  <SelectItem value="SERVICE">Regular Service</SelectItem>
                  <SelectItem value="AUXILIARY">Auxiliary Service</SelectItem>
                  <SelectItem value="PRAYER">Prayer Meeting</SelectItem>
                  <SelectItem value="WORKSHOP">Workshop/Training</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='grid gap-2'>
              <Label htmlFor="date">Date</Label>
              <Input 
                name='date' 
                id="date" 
                type="date"
                defaultValue={formattedDate}
                required 
              />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor="startTime">Start Time</Label>
                <Input 
                  name='startTime' 
                  id="startTime" 
                  type="time"
                  defaultValue={formattedStartTime}
                  required 
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor="endTime">End Time</Label>
                <Input 
                  name='endTime' 
                  id="endTime" 
                  type="time"
                  defaultValue={formattedEndTime}
                  required 
                />
              </div>
            </div>

            {
              ['SERVICE', 'AUXILIARY'].includes(eventType) ? (
                <>
                  <div className='grid gap-2'>
                    <Label htmlFor="guestLead">Guest Lead (Optional)</Label>
                    <Input name='guestLead' id="guestLead" defaultValue={event?.guestLead ?? ""} />
                  </div>

                  <div className='grid gap-2'>
                    <Label htmlFor="dressCode">Dress Code (Optional)</Label>
                    <Textarea name='dressCode' id="dressCode" defaultValue={event?.dressCode ?? ""} />
                  </div>
                
                </>
              ) : ['WORKSHOP', 'PRAYER', 'TOWNHALL'].includes(eventType) ? (
                <>
                  <div className='grid gap-2'>
                    <Label htmlFor="meetingUrl">Meeting Link - Google Meet or Zoom (Optional)</Label>
                    <Input name='meetingUrl' id="meetingUrl" defaultValue={event?.meetingUrl ?? ""} />
                  </div>
                </>
              ) : ['PRAYER'].includes(eventType) ? (
                <>
                  <div className='grid gap-2'>
                    <Label htmlFor="prayerPoints">Prayer Points</Label>
                    <Textarea name='prayerPoints' id="prayerPoints" defaultValue={event?.prayerPoints ?? ""} />
                  </div>
                </>
              ) : null
            }
          </section>
          
          <DialogFooter>
            <Button 
              type="submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Event"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}