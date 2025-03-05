import { Download, FileMusic, Play, MoreHorizontal, Youtube } from "lucide-react"

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

interface MusicTableProps {
  songs: Song[];
}

export function MusicTable({ songs }: MusicTableProps) {


  return (
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
          <TableRow key={music.id}>
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
                  <Button variant="outline" size="icon" className="h-8 w-8" title="Download Sheet Music">
                    <Download className="h-4 w-4" />
                  </Button>
                )}
                {music.mp3_url && (
                  <Button variant="outline" size="icon" className="h-8 w-8" title="Play Audio">
                    <Play className="h-4 w-4" />
                  </Button>
                )}
                {music.link && (
                  <Button variant="outline" size="icon" className="h-8 w-8" title="Download MIDI">
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
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Share</DropdownMenuItem>
                  <DropdownMenuItem>Add to Favorites</DropdownMenuItem>
                  <DropdownMenuItem>Download All Files</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

