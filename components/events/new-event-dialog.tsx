'use client'

import { createNewEvent } from '@/actions/events'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { eventSchema } from '@/lib/validations/event'

export default function NewEventDialog() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [eventType, setEventType] = useState("");

  const validateForm = (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      description: formData.get("description"),
      type: formData.get("type"),
      date: formData.get("date"),
      startTime: formData.get("startTime"),
      endTime: formData.get("endTime"),
      meetingUrl: formData.get("meetingUrl"),
      dressCode: formData.get("dressCode"),
      guestLead: formData.get("guestLead"),

    }

    const result = eventSchema.safeParse(data)
    if (!result.success) {
      // Get the first error message
      const error = result.error.issues[0]
      toast.error("Validation Error", {
        description: error.message
      })
      return false
    }
    return true
  }

  const createEvent = async (formData: FormData) => {
    try {
      // Client-side validation
      if (!validateForm(formData)) {
        return
      }

      const result = await createNewEvent(formData)
      
      if (result.success) {
        toast.success("Event Created Successfully", {
          description: `${formData.get("name")} has been added to the system`,
        })
        setDialogOpen(false)
      } else {
        toast.error("Error Creating Event", {
          description: result.error
        })
      }
    } catch (error: any) {
      toast.error("Error Creating Event", {
        description: error.message || "An unexpected error occurred"
      })
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Event
        </Button>
      </DialogTrigger>

      <DialogContent>
        <form action={createEvent}>
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
          </DialogHeader>

          <section className="space-y-4 my-3">
            <div className='grid gap-2'>
              <Label htmlFor="name">Event Name</Label>
              <Input name='name' id="name" required />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor="description">Description</Label>
              <Textarea name='description' id="description" />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor="type">Event Type</Label>
              <Select onValueChange={(value) => setEventType(value)} name="type" required>
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
              <Input name='date' id="date" type="date" required />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor="startTime">Start Time</Label>
                <Input name='startTime' id="startTime" type="time" required />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor="endTime">End Time</Label>
                <Input name='endTime' id="endTime" type="time" required />
              </div>
            </div>

            {
              ['SERVICE', 'AUXILIARY'].includes(eventType) ? (
                <>
                  <div className='grid gap-2'>
                    <Label htmlFor="guestLead">Guest Lead (Optional)</Label>
                    <Input name='guestLead' id="guestLead" />
                  </div>

                  <div className='grid gap-2'>
                    <Label htmlFor="dressCode">Dress Code (Optional)</Label>
                    <Textarea name='dressCode' id="dressCode" />
                  </div>
                
                </>
              ) : ['WORKSHOP', 'PRAYER', 'TOWNHALL'].includes(eventType) ? (
                <>
                  <div className='grid gap-2'>
                    <Label htmlFor="meetingUrl">Meeting Link - Google Meet or Zoom (Optional)</Label>
                    <Input name='meetingUrl' id="meetingUrl" />
                  </div>
                </>
              ) : ['PRAYER'].includes(eventType) ? (
                <>
                  <div className='grid gap-2'>
                    <Label htmlFor="prayerPoints">Prayer Points</Label>
                    <Textarea name='prayerPoints' id="prayerPoints" />
                  </div>
                </>
              ) : null
            }
          </section>
          
          <DialogFooter>
            <Button type="submit">Create Event</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 