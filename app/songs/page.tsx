import * as React from 'react'
import { Filter, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'

import NewSongDialog from '@/components/songs/new-song-dialog'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MusicGrid } from '@/components/songs/music-grid'
import { Card, CardContent } from '@/components/ui/card'
import { MusicTable } from '@/components/songs/music-table'
import { getSongs } from "@/services/songsService";


export default async function SongsPage() {
  const songs = await getSongs();

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

        {songs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[400px] border rounded-lg">
            <p className="text-xl font-medium text-muted-foreground mb-2">No songs found</p>
            <p className="text-sm text-muted-foreground mb-4">Get started by adding your first song</p>
            <NewSongDialog />
          </div>
        ) : (
          <Tabs defaultValue="grid" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="table">Table View</TabsTrigger>
              </TabsList>

              <div className="text-sm text-muted-foreground">
                Showing {songs.length} {songs.length === 1 ? 'item' : 'items'}
              </div>
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
        )}
      </div>
    </div>

  )
}