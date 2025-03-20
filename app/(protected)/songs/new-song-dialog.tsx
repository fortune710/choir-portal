'use client'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function NewSongDialog() {
    return (
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Song
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Song</DialogTitle>
            </DialogHeader>
            <form className="space-y-4">
              <div>
                <Label htmlFor="name">Song Name</Label>
                <Input id="name" required />
              </div>
              <div>
                <Label htmlFor="youtubeLink">YouTube Link</Label>
                <Input id="youtubeLink" type="url" required />
              </div>
              <div>
                <Label htmlFor="key">Key</Label>
                <Input id="key" required />
              </div>
              <Button type="submit">Add Song</Button>
            </form>
          </DialogContent>
        </Dialog>
    )
}