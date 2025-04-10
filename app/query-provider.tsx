'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 30 * 60 * 1000, //30 minutes
        }
    }
})


export default function QueryProvider({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

