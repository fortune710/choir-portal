import { getEventById } from "@/services/eventsService";
import { format } from "date-fns";
import { getEventTypeColor } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, Users, Link as LinkIcon, Shirt, UserCircle, BookOpen, Info, Music } from "lucide-react";
import PlaylistPlayer from "@/components/songs/playlist-player";

export default async function EventPage({ params }: { params: { event_id: string } }) {
    const eventParams = await params;
    const event = await getEventById(eventParams.event_id);
    if (!event) {
        return <div>Event not found</div>;
    }

    return (
        <div className="container mx-auto py-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">{event.name}</h1>
                <Badge
                    style={{ backgroundColor: getEventTypeColor(event.type) }}
                    className="text-white"
                >
                    {event.type}
                </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Event Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-2">
                            <CalendarDays className="h-5 w-5 text-muted-foreground" />
                            <span>{format(new Date(event.date), "MMMM d, yyyy")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-muted-foreground" />
                            <span>
                                {format(new Date(event.startTime), "h:mm a")} - {format(new Date(event.endTime), "h:mm a")}
                            </span>
                        </div>
                        {event.meetingUrl && (
                            <div className="flex items-center gap-2">
                                <LinkIcon className="h-5 w-5 text-muted-foreground" />
                                <a href={event.meetingUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                    Meeting Link
                                </a>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Additional Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {event.dressCode || event.guestLead || event.prayerPoints ? (
                            <>
                                {event.dressCode && (
                                    <div className="flex items-center gap-2">
                                        <Shirt className="h-5 w-5 text-muted-foreground" />
                                        <span>Dress Code: {event.dressCode}</span>
                                    </div>
                                )}
                                {event.guestLead && (
                                    <div className="flex items-center gap-2">
                                        <UserCircle className="h-5 w-5 text-muted-foreground" />
                                        <span>Guest Lead: {event.guestLead}</span>
                                    </div>
                                )}
                                {event.prayerPoints && (
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="h-5 w-5 text-muted-foreground" />
                                        <span>Prayer Points: {event.prayerPoints}</span>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
                                <Info className="h-10 w-10 mb-2" />
                                <p>No additional information available for this event.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {event.description && (
                <Card>
                    <CardHeader>
                        <CardTitle>Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="whitespace-pre-wrap">{event.description}</p>
                    </CardContent>
                </Card>
            )}
            {event.songs && event.songs.length > 0 ? (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Music className="h-5 w-5" />
                            Songs
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {event.songs.map(({ song }) => {
                            return (
                                <PlaylistPlayer key={song.id} songs={event.songs.map(({ song }) => song)} />
                            )
                        })}
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Music className="h-5 w-5" />
                            Songs
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>No songs assigned to this event yet.</p>
                    </CardContent>
                </Card>
            )}

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Assigned Teams
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {event.teams && event.teams.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {event.teams.map(({ team }) => (
                                <div key={team.id} className="p-4 border rounded-lg">
                                    <h3 className="font-semibold mb-2">{team.name}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {team.description || 'No description available'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
                            <Users className="h-10 w-10 mb-2" />
                            <p>No teams have been assigned to this event yet.</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <UserCircle className="h-5 w-5" />
                        Assigned Members
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {event.members && event.members.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {event.members.map(({ member }) => (
                                <div key={member.id} className="p-4 border rounded-lg flex items-center gap-2">
                                    <UserCircle className="h-5 w-5 text-muted-foreground" />
                                    <span>{member.name}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
                            <UserCircle className="h-10 w-10 mb-2" />
                            <p>No members have been assigned to this event yet.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div >
    );
}
