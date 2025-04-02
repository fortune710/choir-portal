"use client"

import { Music, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Song } from '@prisma/client'

interface PlaylistPlayerProps {
    songs: Song[]
}

export default function PlaylistPlayer({ songs }: PlaylistPlayerProps) {
    const handleDownload = (song: Song) => {
        if (song.mp3_url) {
            const link = document.createElement('a')
            link.href = song.mp3_url
            link.download = `${song.title}.mp3`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }

    if (songs.length === 0) {
        return (
            <div className="p-4 text-center text-muted-foreground">
                No songs available
            </div>
        )
    }

    return (
        <>
            {songs.map((song) => (
                <div key={song.id} className="border max-w-xs rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                            <Music className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <h3 className="font-medium">{song.title}</h3>
                                <p className="text-sm text-muted-foreground">{song.artist}</p>
                            </div>
                        </div>
                        {song.mp3_url && (
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleDownload(song)}
                            >
                                <Download className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>
            ))}
        </>


    )
} 