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
import { createSong } from "@/actions/songs";
import { toast } from "sonner";
import { useState } from "react";

export default function NewSongDialog() {
    const [open, setOpen] = useState(false);

    async function onSubmit(formData: FormData) {
        const result = await createSong(formData);
        if (result.success) {
            toast.success("Song created successfully");
            setOpen(false);
        } else {
            toast.error(result.error || "Failed to create song");
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Song
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Song</DialogTitle>
                </DialogHeader>
                <form action={onSubmit} className="space-y-4">
                    <div className='grid gap-2'>
                        <Label htmlFor="name">Song Name</Label>
                        <Input id="name" name="name" required />
                    </div>
                    <div className='grid gap-2'>
                        <Label htmlFor="artist">Artist</Label>
                        <Input id="artist" name="artist" required />
                    </div>
                    <div className='grid gap-2'>
                        <Label htmlFor="youtubeLink">YouTube Link</Label>
                        <Input id="youtubeLink" name="youtubeLink" type="url" required />
                    </div>
                    <div className='grid gap-2'>
                        <Label htmlFor="mp3">MP3 File (Optional)</Label>
                        <Input id="mp3" name="mp3" type="file" accept=".mp3" />
                    </div>
                    <Button type="submit">Add Song</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}