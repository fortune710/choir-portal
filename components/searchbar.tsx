'use client'
import { Filter, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createQueryString } from '@/lib/utils'

interface SearchbarProps {
    placeholder?: string
}

export default function Searchbar({ placeholder }: SearchbarProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [searchValue, setSearchValue] = useState(searchParams.get('search') ?? '')

  

    // Debounce effect
    useEffect(() => {
   
      useDebounceCallback(() => {
        router.push(`?${createQueryString('search', searchValue)}`)
    }, 500)
    }, [searchValue, router, createQueryString])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    return (
        <div className="flex flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder={placeholder ?? "Search"} 
                className="pl-8"
                onChange={handleSearch}
                value={searchValue}
              />
            </div>
            <Button variant="outline" className="md:w-auto w-10">
              <Filter className="mr-2 max-md:mr-0 h-4 w-4" />
              <span className='hidden md:block'>Filter</span>
            </Button>
        </div>
    )
}