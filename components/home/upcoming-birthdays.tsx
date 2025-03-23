'use client'

import * as React from 'react'
import { format, differenceInDays, addDays } from 'date-fns'
import { Cake, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

interface UpcomingBirthdaysProps {
    members: any[]
}

export default function UpcomingBirthdays({ members }: UpcomingBirthdaysProps) {
    // Get today's date
    const today = new Date()

    // Filter and sort members by upcoming birthdays
    const upcomingBirthdays = members
        .map(member => {
            const birthday = new Date(member.birthday)
            // Set the birthday to this year
            birthday.setFullYear(today.getFullYear())

            // If the birthday has passed this year, set it to next year
            if (birthday < today) {
                birthday.setFullYear(today.getFullYear() + 1)
            }

            return {
                ...member,
                daysUntilBirthday: differenceInDays(birthday, today)
            }
        })
        .sort((a, b) => a.daysUntilBirthday - b.daysUntilBirthday)
        .slice(0, 5) // Show only the next 5 birthdays

    return (
        <Card className=' border-none shadow-none'>
            <CardHeader>
                <CardTitle>Upcoming Birthdays</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-fit w-full rounded-md">
                    {upcomingBirthdays.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-8 text-center">
                            <Cake className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No upcoming birthdays</h3>
                            <p className="text-sm text-muted-foreground">There are no upcoming birthdays to display.</p>
                        </div>
                    ) : (
                        <div className="flex w-max space-x-4 p-4">
                            {upcomingBirthdays.map((member) => (
                                <div
                                    key={member.id}
                                    className={cn(
                                        "max-w-[350px] shrink-0 rounded-lg border bg-card p-4",
                                        "hover:bg-accent/50 transition-colors relative"
                                    )}
                                >
                                    <div className="h-1 absolute top-0 left-0 right-0 rounded-t-lg bg-pink-500"></div>
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-semibold text-lg">{member.name}</h3>
                                        <Badge variant="outline">
                                            {member.daysUntilBirthday === 0
                                                ? "Today"
                                                : member.daysUntilBirthday === 1
                                                    ? "Tomorrow"
                                                    : `${member.daysUntilBirthday} days`}
                                        </Badge>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Cake className="h-4 w-4" />
                                            <span>
                                                {format(new Date(member.birthday), 'MMM d')}
                                            </span>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </CardContent>
        </Card>
    )
}
