import * as React from 'react'
import { getEvents } from '@/services/eventsService'
import { Filter, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import EventsTable from '@/components/events/events-table'
import NewEventDialog from '@/components/events/new-event-dialog'
import { Calendar } from '@/components/ui/calendar'

export default async function EventsPage() {
  const eventsData = await getEvents()
  
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

  return (
    <div className='grid grid-cols-8 w-full border-green-60'>
      <div className="flex flex-col gap-4 md:gap-8 col-span-6">
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
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search events" className="pl-8" />
            </div>
            <Button variant="outline" className="sm:w-auto">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
          </div>

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
      
      <section className='col-span-2'>
        <Calendar
          className='mx-auto'
        />
      </section>
    </div>
  )
} 