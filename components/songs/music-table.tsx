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
  // Sample music data - in a real app, this would come from an API
  const musicItems = [
    {
      id: 1,
      title: "Amazing Grace",
      composer: "John Newton, arr. by John Smith",
      category: "Hymn",
      voiceParts: ["SATB"],
      difficulty: 2,
      dateAdded: "Mar 1, 2025",
      hasSheet: true,
      hasAudio: true,
      hasMidi: true,
      hasVideo: false,
      status: "new",
    },
    {
      id: 2,
      title: "How Great Thou Art",
      composer: "Stuart K. Hine",
      category: "Hymn",
      voiceParts: ["SATB"],
      difficulty: 3,
      dateAdded: "Feb 28, 2025",
      hasSheet: true,
      hasAudio: true,
      hasMidi: true,
      hasVideo: true,
      status: "updated",
    },
    {
      id: 3,
      title: "Hallelujah Chorus",
      composer: "G.F. Handel",
      category: "Classical",
      voiceParts: ["SATB"],
      difficulty: 4,
      dateAdded: "Feb 25, 2025",
      hasSheet: true,
      hasAudio: false,
      hasMidi: true,
      hasVideo: false,
      status: "new",
    },
    {
      id: 4,
      title: "10,000 Reasons",
      composer: "Matt Redman",
      category: "Contemporary",
      voiceParts: ["SAB"],
      difficulty: 2,
      dateAdded: "Feb 20, 2025",
      hasSheet: true,
      hasAudio: true,
      hasMidi: false,
      hasVideo: true,
      status: "",
    },
    {
      id: 5,
      title: "It Is Well With My Soul",
      composer: "Horatio Spafford",
      category: "Hymn",
      voiceParts: ["SATB"],
      difficulty: 3,
      dateAdded: "Feb 18, 2025",
      hasSheet: true,
      hasAudio: true,
      hasMidi: true,
      hasVideo: false,
      status: "",
    },
  ]

  // Get difficulty label
  const getDifficultyLabel = (level: number) => {
    switch (level) {
      case 1:
        return "Beginner"
      case 2:
        return "Easy"
      case 3:
        return "Intermediate"
      case 4:
        return "Advanced"
      case 5:
        return "Expert"
      default:
        return "Intermediate"
    }
  }

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

