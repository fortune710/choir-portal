import { useQuery } from "@tanstack/react-query"

async function fetchAvailableSongs() {
    const response = await fetch('/api/songs')
    if (!response.ok) throw new Error('Failed to fetch songs')
    const res = await response.json();
    return res.data
}


export function useSongs(enabled: boolean = true) {
    return useQuery({
        queryKey: ['songs'],
        queryFn: fetchAvailableSongs,
        enabled
    })
}
