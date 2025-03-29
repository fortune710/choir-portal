import { Filter, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface SearchbarProps {
    placeholder?: string
}

export default function Searchbar({ placeholder }: SearchbarProps) {
    return (
        <div className="flex flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder={placeholder ?? "Search"} className="pl-8" />
            </div>
            <Button variant="outline" className="md:w-auto w-10">
              <Filter className="mr-2 max-md:mr-0 h-4 w-4" />
              <span className='hidden md:block'>Filter</span>
            </Button>
        </div>
    )
}