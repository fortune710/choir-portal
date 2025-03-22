'use client'

import * as React from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'


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

    return (

        <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            modifiers={{
                hasEvent: (date) => datesWithEvents.has(format(date, 'yyyy-MM-dd'))
            }}
            modifiersStyles={{
                hasEvent: {
                    borderBottom: '2px solid hsl(var(--primary))',
                    borderRadius: '0'
                }
            }}
        />
    )
}