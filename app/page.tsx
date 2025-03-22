
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CalendarView from '@/components/home/calender'
import { getEvents } from '@/services/eventsService'
import UpcomingEvents from '@/components/home/upcoming-events'

const upcomingEvents = [
  {
    id: 1,
    title: 'Sunday Service',
    date: '2023-06-18',
    time: '10:00 AM',
  },
  // Add more events...
]

export default async function HomePage() {
 
 const events = await getEvents()

 const upcomingEvents = events.filter((event) => event.date > new Date())
 console.log(upcomingEvents)  
  return (
    <div className="flex overflow-hidden">   
        <UpcomingEvents events={upcomingEvents} />
      <div className="hidden lg:block w-80 ml-4">
        <CalendarView events={upcomingEvents} />
      </div>
    </div>
  )
}