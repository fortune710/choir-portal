
import CalendarView from '@/components/home/calender'
import { getUpcomingEvents } from '@/services/eventsService'
import UpcomingEvents from '@/components/home/upcoming-events'
import { getUsers } from '@/services/usersService'
import UpcomingBirthdays from '@/components/home/upcoming-birthdays'


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
        <UpcomingEvents events={upcomingEvents} />
        <UpcomingBirthdays members={usersWithBirthdays} />
      </div>
      <div className="md:block hidden col-span-2">
        <CalendarView events={upcomingEvents} />
      </div>
    </div>
  )
}