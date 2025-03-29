'use client'

import * as React from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { Clock, Calendar as CalendarIcon, Users } from 'lucide-react'
import { getEventTypeColor } from '@/lib/utils'
import { ScrollArea } from "@/components/ui/scroll-area"

interface CalendarViewProps {
    events: {
        [key: string]: any;
    }[]
}

export default function CalendarView({ events }: CalendarViewProps) {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    // Create a map of dates that have events
    const datesWithEvents = React.useMemo(() => {
        const dates = new Set<string>()
        events.forEach(event => {
            dates.add(format(event.date, 'yyyy-MM-dd'))
        })
        return dates
    }, [events])

    // Get events for the selected date
    const selectedDateEvents = React.useMemo(() => {
        if (!date) return []
        return events.filter(event =>
            format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
        )
    }, [date, events])

    return (
        <div className="space-y-4 p-4 w-full">
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border w-fit max-md:mx-auto"
                modifiers={{
                    hasEvent: (date) => datesWithEvents.has(format(date, 'yyyy-MM-dd'))
                }}
                modifiersStyles={{
                    hasEvent: {
                        position: 'relative',
                    }
                }}
                components={{
                    DayContent: ({ date, displayMonth, activeModifiers }) => {
                        const hasEvent = datesWithEvents.has(format(date, 'yyyy-MM-dd'))
                        const eventsForDate = events.filter(event =>
                            format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
                        )
                        return (
                            <div className="relative">
                                <span>{date.getDate()}</span>
                                {hasEvent && eventsForDate.length > 0 && (
                                    <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 flex gap-1">
                                        {eventsForDate.slice(0, 4).map((event, index) => (
                                            <span
                                                key={event.id}
                                                className="w-1 h-1 rounded-full"
                                                style={{ backgroundColor: getEventTypeColor(event.type) }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )
                    }
                }}
            />

            {selectedDateEvents.length > 0 && (
                <section>
                    <h2 className='font-semibold text-lg mb-2'>Scheduled Events</h2>
                    <ScrollArea className="h-[250px] rounded-md">
                        <div className="space-y-4">
                            {selectedDateEvents.map((event) => (
                                <div key={event.id} className="flex flex-col gap-1 p-4 border rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-base">{event.name}</h3>
                                        <Badge className="capitalize text-xs" variant="outline">
                                            {event.type}
                                        </Badge>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <CalendarIcon className="h-4 w-4" />
                                        <span>{format(event.date, 'PPP')}</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Clock className="h-4 w-4" />
                                        <span>
                                            {format(event.startTime, 'HH:mm ')} - {format(event.endTime, 'HH:mm ')}
                                        </span>

                                        <div style={{ backgroundColor: getEventTypeColor(event.type) }} className='h-2 w-2 rounded-sm' />
                                    </div>
                                    {/* <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Users className="h-4 w-4" />
                                        <div className="flex flex-wrap gap-2">
                                            {event.teams.length > 0 ? (
                                                event.teams.map((team: any) => (
                                                    <Badge key={team.team.id} variant="secondary">
                                                        {team.team.name}
                                                    </Badge>
                                                ))
                                            ) : (
                                                <span className="text-muted-foreground">No teams assigned</span>
                                            )}
                                        </div>
                                    </div> */}
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </section>
            )}
        </div>
    )
}