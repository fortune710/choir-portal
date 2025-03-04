import * as React from 'react'
import { MoreHorizontal, } from 'lucide-react'

import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import NewRoleDialog from './new-role-dialog'

// import { getSongs } from "../api/services/songsService";
// const songs = getSongs();

const songs = [
  {
    id: 1,
    name: 'Amazing Grace',
    youtubeLink: 'https://youtube.com/watch?v=...',
    key: 'G',
  },
  // Add more songs...
]



export default function RolesPage() {


  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Roles</h1>
        <NewRoleDialog/>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Role Name</TableHead>
            <TableHead>Member Count</TableHead>
            <TableHead>Permissions Count</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {songs.map((song) => (
            <TableRow key={song.id}>
              <TableCell>{song.name}</TableCell>
              <TableCell>
                <a href={song.youtubeLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  Watch on YouTube
                </a>
              </TableCell>
              <TableCell>{song.key}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}