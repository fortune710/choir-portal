"use client"
import { Download, FileMusic, Play, MoreHorizontal, Youtube, Pause } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Song } from "@prisma/client"
import AssignEventDialog from "./assign-event-dialog"
import React, { useState } from "react"
import EditSongDialog from "./edit-song-dialog"
import DeleteSongAlert from "./delete-song-alert"

interface MusicGridProps {
  songs: Song[];
}

export function MusicGrid({ songs }: MusicGridProps) {
  const [assignEventOpen, setAssignEventOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false)
  const [selectedSong, setSelectedSong] = useState<Song | null>(null)
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)
  const audioRef = React.useRef<HTMLAudioElement | null>(null)

  const togglePlay = (songId: string, mp3Url: string) => {
    if (currentlyPlaying === songId) {
      audioRef.current?.pause()
      setCurrentlyPlaying(null)
    } else {
      if (audioRef.current) {
        audioRef.current.src = mp3Url
        audioRef.current.play()
        setCurrentlyPlaying(songId)
      }
    }
  }

  const openEditDialog = (song: Song) => {
    setSelectedSong(song);
    setEditDialogOpen(true);
  };
  const openDeleteAlert = (song: Song) => {
    setSelectedSong(song);
    setDeleteAlertOpen(true);
  };
  const openAssignEvent = (song: Song) => {
    setSelectedSong(song);
    setAssignEventOpen(true);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <audio ref={audioRef} />
      {songs.map((music) => (
        <Card key={music.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg truncate" title={music.title}>
                {music.title}
              </CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => openEditDialog(music)}>Edit</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => openAssignEvent(music)}>Assign to Event</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => openDeleteAlert(music)} className="text-destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="text-sm text-muted-foreground truncate">{music.artist}</div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex items-center text-xs text-muted-foreground">
              <span className="truncate">Added: {music.created_at.toDateString()}</span>
              <Badge className="ml-2" variant={"new" === "new" ? "default" : "secondary"}>
                new
              </Badge>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-2">
            <div className="flex gap-1">
              {music.mp3_url && (
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  title="Download Sheet Music"
                  onClick={() => window.open(music.mp3_url!, '_blank')}
                >
                  <Download className="h-4 w-4" />
                </Button>
              )}
              {music.mp3_url && (
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  title={currentlyPlaying === music.id ? "Pause Audio" : "Play Audio"}
                  onClick={() => togglePlay(music.id, music.mp3_url!)}
                >
                  {currentlyPlaying === music.id ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
              )}
              {music.link && (
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  title="Open YouTube"
                  onClick={() => window.open(music.link!, '_blank')}
                >
                  <Youtube className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Button size="sm">View Details</Button>
          </CardFooter>
        </Card>
      ))}

      {selectedSong && (
        <>
          <EditSongDialog
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
            song={selectedSong}
          />
          <DeleteSongAlert
            open={deleteAlertOpen}
            onOpenChange={setDeleteAlertOpen}
            songId={selectedSong.id}
            songTitle={selectedSong.title}
          />
          <AssignEventDialog
            open={assignEventOpen}
            onOpenChange={setAssignEventOpen}
            songId={selectedSong.id}
            songTitle={selectedSong.title}
          />
        </>
      )}
    </div>
  )
}

