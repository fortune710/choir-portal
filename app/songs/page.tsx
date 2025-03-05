import * as React from 'react'
import { Filter, MoreHorizontal, Search, } from 'lucide-react'

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
import NewSongDialog from './new-song-dialog'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MusicGrid } from '@/components/songs/music-grid'
import { Card, CardContent } from '@/components/ui/card'
import { MusicTable } from '@/components/songs/music-table'
import { Song } from '@prisma/client'

// import { getSongs } from "../api/services/songsService";
// const songs = getSongs();

const songs: Song[] = [
  {
    id: "1",
    title: 'Amazing Grace',
    link: 'https://youtube.com/watch?v=...',
    mp3_url: "DSfs",
    created_at: new Date(),
    updated_at: new Date(),
    artist: "Me"
  },
  // Add more songs...
]



export default function SongsPage() {


  return (
    <div className="flex flex-col gap-4 md:gap-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Music Library</h1>
            <p className="text-muted-foreground">Access and manage your sheet music and recordings</p>
          </div>
          <div className="flex items-center gap-2">
            <NewSongDialog/>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search music..." className="pl-8" />
            </div>
            <Button variant="outline" className="sm:w-auto">
              <Filter className="mr-2 h-4 w-4" /> Sort
            </Button>
          </div>

          <Tabs defaultValue="grid" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="table">Table View</TabsTrigger>
              </TabsList>

              <div className="text-sm text-muted-foreground">Showing 24 of 124 items</div>
            </div>

            <TabsContent value="grid" className="mt-0">
              <MusicGrid songs={songs} />
            </TabsContent>

            <TabsContent value="table" className="mt-0">
              <Card>
                <CardContent className="p-0">
                  <MusicTable songs={songs} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>



    // <div>
    //   <div className="flex justify-between items-center mb-4">
    //     <h1 className="text-2xl font-bold">Songs</h1>
    //     <NewSongDialog/>
    //   </div>
    //   <Table>
    //     <TableHeader>
    //       <TableRow>
    //         <TableHead>Song Name</TableHead>
    //         <TableHead>YouTube Link</TableHead>
    //         <TableHead>Key</TableHead>
    //         <TableHead>Actions</TableHead>
    //       </TableRow>
    //     </TableHeader>
    //     <TableBody>
    //       {songs.map((song) => (
    //         <TableRow key={song.id}>
    //           <TableCell>{song.name}</TableCell>
    //           <TableCell>
    //             <a href={song.youtubeLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
    //               Watch on YouTube
    //             </a>
    //           </TableCell>
    //           <TableCell>{song.key}</TableCell>
    //           <TableCell>
    //             <DropdownMenu>
    //               <DropdownMenuTrigger asChild>
    //                 <Button variant="ghost" className="h-8 w-8 p-0">
    //                   <MoreHorizontal className="h-4 w-4" />
    //                 </Button>
    //               </DropdownMenuTrigger>
    //               <DropdownMenuContent align="end">
    //                 <DropdownMenuItem>Edit</DropdownMenuItem>
    //                 <DropdownMenuItem>Delete</DropdownMenuItem>
    //               </DropdownMenuContent>
    //             </DropdownMenu>
    //           </TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </div>
  )
}