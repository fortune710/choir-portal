'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Clock, Music, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

type Event = {
    id: string
    name: string
    description: string
    type: 'REHEARSAL' | 'SERVICE' | 'SPECIAL'
    date: Date
    startTime: Date
    endTime: Date
    teams: {
        team: {
            id: string
            name: string
        }
    }[]
}

interface UpcomingEventsProps {
    events: Event[]
}

export default function UpcomingEvents({ events }: UpcomingEventsProps) {
    return (
        <Card className='w-1/2 border-none shadow-none'>
            <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="">
                    <ScrollArea className="h-fit w-full rounded-md">
                        <div className="flex w-max space-x-4 p-4">
                            {events.map((event: any) => (
                                <div
                                    key={event.id}
                                    className={cn(
                                        "w-[350px] shrink-0 rounded-lg border bg-card p-4",
                                        "hover:bg-accent/50 transition-colors"
                                    )}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-semibold text-lg">{event.name}</h3>
                                        <Badge className="capitalize" variant="outline">
                                            {event.type}
                                        </Badge>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Clock className="h-4 w-4" />
                                            <span>
                                                {format(event.startTime, 'h:mm ')} •{' '}
                                                {format(event.date, 'EEE MMM d')}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Music className="h-4 w-4" />
                                            <span className="truncate">
                                                {event.description || 'No songs assigned'}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
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
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </div>
            </CardContent>
        </Card>
    )
}
