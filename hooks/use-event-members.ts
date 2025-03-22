import { User } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"

async function fetchEventMembers(eventId: string) {
    const response = await fetch(`/api/events/${eventId}/members`)
    if (!response.ok) throw new Error('Failed to fetch members')
    return response.json()
  }

export function useEventMembers(eventId: string, enabled: boolean = true) {
    
  return useQuery<User[]>({
    queryKey: ['eventMembers', eventId],
    queryFn: () => fetchEventMembers(eventId),
    enabled,
  })

}