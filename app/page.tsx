'use client'

import * as React from 'react'
import { Calendar } from '@/components/ui/calendar'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const upcomingEvents = [
  {
    id: 1,
    title: 'Sunday Service',
    date: '2023-06-18',
    time: '10:00 AM',
  },
  // Add more events...
]

export default function HomePage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className="flex">
      <div className="flex-1 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {upcomingEvents.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Date: {event.date}</p>
              <p>Time: {event.time}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="hidden lg:block w-80 ml-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>
    </div>
  )
}