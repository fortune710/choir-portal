'use client'

import { updateTeam } from '@/actions/teams'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { toast } from 'sonner'

interface EditTeamDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    team: {
        id: string
        name: string
        description: string
    }
}

export default function EditTeamDialog({ open, onOpenChange, team }: EditTeamDialogProps) {
    const [name, setName] = useState(team.name)
    const [description, setDescription] = useState(team.description)

    const handleSubmit = async () => {
        try {
            const result = await updateTeam(team.id, { name, description })
            if (result.success) {
                toast.success("Team Updated Successfully")
                onOpenChange(false)
            } else {
                throw new Error(result.error)
            }
        } catch (error: any) {
            toast.error("Error Updating Team", {
                description: error.message || "Failed to update team"
            })
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Team</DialogTitle>
                </DialogHeader>
                <form action={handleSubmit}>
                    <div className="space-y-4 my-3">
                        <div className='grid gap-2'>
                            <Label htmlFor="name">Team Name</Label>
                            <Input 
                                id="name" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required 
                            />
                        </div>
                        <div className='grid gap-2'>
                            <Label htmlFor="description">Description</Label>
                            <Textarea 
                                id="description" 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
} 