"use client"
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { format } from 'date-fns'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import EventSongsDialog from './event-songs-dialog'
import { useState } from 'react'
import AssignSongDialog from './assign-song-dialog'
import DeleteEventAlert from './delete-event-dialog'
import EditEventDialog from './edit-event-dialog'
import { Events } from '@prisma/client'
interface EventsTableProps {
  events: Array<Events & { teams: string[] }>
}

export default function EventsTable({ events }: EventsTableProps) {
  const [assignSongOpen, setAssignSongOpen] = useState(false);
  const [eventSongsOpen, setEventSongsOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Events | null>(null);

  const openAssignSongs = (event: Events) => {
    setSelectedEvent(event);
    setAssignSongOpen(true);
  };
  const openEventSongs = (event: Events) => {
    setSelectedEvent(event);
    setEventSongsOpen(true);
  };
  const openEditDialog = (event: Events) => {
    setSelectedEvent(event);
    setEditDialogOpen(true);
  };
  const openDeleteAlert = (event: Events) => {
    setSelectedEvent(event);
    setDeleteAlertOpen(true);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Teams</TableHead>
            <TableHead className="w-[50px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell>
                {event.name}
              </TableCell>
              <TableCell>
                <Badge className='capitalize' variant="outline">{event.type}</Badge>
              </TableCell>
              <TableCell>{format(event.date, 'PPP')}</TableCell>
              <TableCell>
                {format(event.startTime, 'p')} - {format(event.endTime, 'p')}
              </TableCell>
              <TableCell>
                {event.teams.map((team) => (
                  <Badge key={team} variant="secondary" className="mr-1">
                    {team}
                  </Badge>
                ))}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => openEditDialog(event)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openEventSongs(event)}>View Assigned Songs</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openAssignSongs(event)}>Assign Song</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => openDeleteAlert(event)} className="text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedEvent && (
        <>
          <AssignSongDialog
            open={assignSongOpen}
            onOpenChange={setAssignSongOpen}
            eventId={selectedEvent.id}
            eventName={selectedEvent.name}
          />

          <EventSongsDialog
            open={eventSongsOpen}
            onOpenChange={setEventSongsOpen}
            eventId={selectedEvent.id}
            eventName={selectedEvent.name}
          />

          <EditEventDialog
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
            event={selectedEvent}
          />
          <DeleteEventAlert
            open={deleteAlertOpen}
            onOpenChange={setDeleteAlertOpen}
            eventId={selectedEvent.id}
            eventName={selectedEvent.name}
          />
        </>
      )}
    </>
  )
} 