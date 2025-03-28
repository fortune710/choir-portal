import CalendarView from '@/components/home/calender'
import { getUpcomingEvents } from '@/services/eventsService'
import UpcomingEvents from '@/components/home/upcoming-events'
import { getUsers } from '@/services/usersService'
import UpcomingBirthdays from '@/components/home/upcoming-birthdays'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function HomePage() {
  const upcomingEvents = await getUpcomingEvents()
  const users = await getUsers()
  const usersWithBirthdays = users.filter((user) => {
    if (!user.birthday) return false
    return user.birthday > new Date()
  })

  return (
    <div className="md:grid md:grid-cols-8 overflow-x-hidden">
      <div className=" md:hidden md:max-w-1/2 m-4">
        <CalendarView events={upcomingEvents} />
      </div>
      <div className='max-md:w-svw md:col-span-6'>
        <div className="md:hidden">
          <Tabs defaultValue="events" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="birthdays">Birthdays</TabsTrigger>
            </TabsList>
            <TabsContent value="events">
              <UpcomingEvents events={upcomingEvents} />
            </TabsContent>
            <TabsContent value="birthdays">
              <UpcomingBirthdays members={usersWithBirthdays} />
            </TabsContent>
          </Tabs>
        </div>
        <div className="hidden md:block">
          <UpcomingEvents events={upcomingEvents} />
          <UpcomingBirthdays members={usersWithBirthdays} />
        </div>
      </div>
      <div className="md:block md:max-w-1/2  hidden col-span-2">
        <CalendarView events={upcomingEvents} />
      </div>
    </div>
  )
}