import { Download, FileMusic, Play, MoreHorizontal, Youtube } from "lucide-react"

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

interface MusicGridProps {
  songs: Song[];
}

export function MusicGrid({ songs }: MusicGridProps) {
  


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Share</DropdownMenuItem>
                  <DropdownMenuItem>Add to Favorites</DropdownMenuItem>
                  <DropdownMenuItem>Download All Files</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
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
            <Button size="sm">View Details</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

