import { z } from "zod"
import { startOfDay, isBefore } from "date-fns"

// Helper function to convert time string to Date
const timeStringToDate = (timeStr: string, baseDate: Date) => {
  const [hours, minutes] = timeStr.split(':').map(Number)
  const date = new Date(baseDate)
  date.setHours(hours, minutes)
  return date
}

export const eventSchema = z.object({
  name: z.string().min(1, "Event name is required"),
  description: z.string().optional(),
  type: z.enum(["REHEARSAL", "SERVICE", "SPECIAL"], {
    errorMap: () => ({ message: "Please select a valid event type" })
  }),
  date: z.string().refine((date) => {
    const eventDate = new Date(date)
    const today = startOfDay(new Date())
    return !isBefore(eventDate, today)
  }, "Cannot create events in the past"),
  startTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
  endTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
}).refine((data) => {
  const eventDate = new Date(data.date)
  const startDateTime = timeStringToDate(data.startTime, eventDate)
  const endDateTime = timeStringToDate(data.endTime, eventDate)
  
  return !isBefore(endDateTime, startDateTime)
}, {
  message: "End time must be after start time",
  path: ["endTime"]
}).refine((data) => {
  const eventDate = new Date(data.date)
  const now = new Date()
  const startDateTime = timeStringToDate(data.startTime, eventDate)
  
  // Only validate start time if event is today
  if (eventDate.toDateString() === now.toDateString()) {
    return !isBefore(startDateTime, now)
  }
  return true
}, {
  message: "Cannot set start time in the past",
  path: ["startTime"]
})

export type EventFormData = z.infer<typeof eventSchema> 