'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Clock, Music, Users, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { cn, getEventTypeColor } from '@/lib/utils'



interface UpcomingEventsProps {
    events: any[]
}

export default function UpcomingEvents({ events }: UpcomingEventsProps) {
    return (
        <Card className=' border-none shadow-none'>
            <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
                {events.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                        <Calendar className="h-12 w-12 mb-4 opacity-50" />
                        <p>No upcoming events</p>
                    </div>
                ) : (
                    <ScrollArea className="h-fit w-full rounded-md ">
                        <div className="flex w-max space-x-4 p-4">
                            {events.map((event: any) => {
                                const color = getEventTypeColor(event.type)
                                console.log('Event type:', event.type, 'Color:', color)
                                return <div
                                    key={event.id}
                                    className={cn(
                                        "max-w-[350px] shrink-0 rounded-lg border bg-card p-4",
                                        "hover:bg-accent/50 transition-colors relative "
                                    )}
                                >
                                    <div className={cn(
                                        "h-1 absolute top-0 left-0 right-0 rounded-t-lg",)} style={{ backgroundColor: color }}></div>
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
                                        <div className='flex gap-2'>

                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Music className="h-4 w-4" />
                                                <span className="truncate">
                                                    {event.songs.length > 0 ? (
                                                        event.songs.map((eventSong: any) => eventSong.song.title).join(', ')
                                                    ) : (
                                                        'No songs'
                                                    )}
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
                                </div>
                            })}
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                )}
            </CardContent>
        </Card>
    )
}
