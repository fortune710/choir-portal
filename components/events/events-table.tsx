import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '../ui/button'
import { MoreHorizontal } from 'lucide-react'
import { format } from 'date-fns'

interface EventsTableProps {
  events: Array<{
    id: string
    name: string
    description: string
    type: "REHEARSAL" | "SERVICE" | "SPECIAL"
    date: Date
    startTime: Date
    endTime: Date
    teams: string[]
  }>
}

export default function EventsTable({ events }: EventsTableProps) {
  return (
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
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
} 