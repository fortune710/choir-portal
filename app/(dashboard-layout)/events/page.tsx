import * as React from 'react'
import { getEvents, getUpcomingEvents } from '@/services/eventsService'

import { Card, CardContent } from '@/components/ui/card'
import EventsTable from '@/components/events/events-table'
import NewEventDialog from '@/components/events/new-event-dialog'
import { Calendar } from '@/components/ui/calendar'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import Searchbar from '@/components/searchbar'

export default async function EventsPage({searchParams}: {searchParams: {search: string}}) {
  const [eventsData, upcomingEvents] = await Promise.all([
    getEvents(),
    getUpcomingEvents()
  ]);
  
  const events = eventsData.map((event) => ({
    ...event,
    id: event.id,
    name: event.name,
    description: event.description,
    type: event.type,
    date: event.date,
    startTime: event.startTime,
    endTime: event.endTime,
    teams: event.teams.map(eventTeam => eventTeam.team.name)
  }))
  const search = await searchParams

  console.log(search.search)

  // Format upcoming events for the calendar
  const upcomingDates = upcomingEvents.map(event => new Date(event.date))

  return (
    <div className='grid max-md:grid-cols-1 grid-cols-8 w-full'>
      <div className="flex flex-col gap-4 md:gap-8 md:col-span-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Events</h1>
            <p className="text-muted-foreground">Manage your events and schedules</p>
          </div>
          <div className="flex items-center gap-2">
            <NewEventDialog />
          </div>
        </div>

        <div className="flex-1">
          <Searchbar placeholder='Search events'/>

          {events.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[400px] border rounded-lg">
              <p className="text-xl font-medium text-muted-foreground mb-2">No events found</p>
              <p className="text-sm text-muted-foreground mb-4">Get started by creating your first event</p>
              <NewEventDialog />
            </div>
          ) : (
            <Card>
              <CardContent className="p-0">
                <EventsTable events={events} />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      <section className='col-span-2 px-3.5 max-md:hidden'>
        <div className='w-full flex justify-center mb-3'>
          <Calendar
            mode="multiple"
            selected={upcomingDates}
            className='mx-auto'
          />
        </div>

        {/* Upcoming Events List */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Upcoming Events</h3>
            <div className="space-y-2">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex flex-col space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{event.name}</span>
                    <Badge variant="outline">{event.type}</Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(event.date), 'PPP')}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(event.startTime), 'p')} - {format(new Date(event.endTime), 'p')}
                  </span>
                  <div className="border-t my-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
} 