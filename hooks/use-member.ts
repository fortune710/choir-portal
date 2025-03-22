import { User } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"

export function useMembers(enabled: boolean = true) {
    async function fetchMembers() {
        const response = await fetch('/api/members')
        if (!response.ok) {
            throw new Error('Failed to fetch members')
        }
        return response.json()
    }

    const { data: allMembers, isLoading: isLoadingMembers } = useQuery<User[]>({
        queryKey: ['members'],
        queryFn: fetchMembers,
        enabled, // Only fetch when dialog is open
    })

    return {
        allMembers,
        isLoadingMembers
    }
}