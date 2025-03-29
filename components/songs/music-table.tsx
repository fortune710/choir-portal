"use client"
import { Download, FileMusic, Play, MoreHorizontal, Youtube, Pause } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Song } from "@prisma/client"
import React, { useState } from "react"
import AssignEventDialog from "./assign-event-dialog"
import EditSongDialog from "./edit-song-dialog"
import DeleteSongAlert from "./delete-song-alert"

interface MusicTableProps {
  songs: Song[];
}

export function MusicTable({ songs }: MusicTableProps) {
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
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30px]">
              <Checkbox />
            </TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="hidden md:table-cell">Artists</TableHead>
            <TableHead className="hidden md:table-cell">Date Added</TableHead>
            <TableHead>Files</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {songs.map((music) => (
            <React.Fragment key={music.id}>
              <TableRow>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <div className="font-medium">{music.title}</div>
                  <div className="text-sm text-muted-foreground md:hidden">{music.artist}</div>
                  <Badge className="mt-1" variant={"new" === "new" ? "default" : "secondary"}>
                    new
                  </Badge>

                </TableCell>
                <TableCell className="hidden md:table-cell">{music.artist}</TableCell>
                <TableCell className="hidden md:table-cell">{music.created_at.toDateString()}</TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
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
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
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
      <audio ref={audioRef} />
    </div>
  )
}

