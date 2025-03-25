'use client'

import { createTeam } from '@/actions/teams'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useMembers } from '@/hooks/use-member'


export default function NewTeamDialog() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const { allMembers, isLoadingMembers } = useMembers();

    const createNewTeam = async (formData: FormData) => {
        const teamName = formData.get("name")?.toString() ?? "";

        try {
            const result = await createTeam(formData);
            if (result.success) {
                toast.success("Team Created Successfully", {
                    description: `${teamName} has been added to the system`,
                });
                setDialogOpen(false);
            } else {
                throw new Error(result.error);
            }
        } catch (error: any) {
            toast.error("Error Creating Team", {
                description: error.message || 
                `${teamName} could not be added to the system`,
            });
        }
    }

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> 
                    Add Team
                </Button>
            </DialogTrigger>
            <DialogContent>
                <form action={createNewTeam}>
                    <DialogHeader>
                        <DialogTitle>Add New Team</DialogTitle>
                        <DialogDescription>
                            Create a new team and add members later
                        </DialogDescription>
                    </DialogHeader>
                    
                    <section className="space-y-4 my-3">
                        <div className='grid gap-2'>
                            <Label htmlFor="name">Team Name</Label>
                            <Input id="name" name="name" required />
                        </div>
                        <div className='grid gap-2'>
                            <Label htmlFor="description">Description</Label>
                            <Textarea 
                                id="description" 
                                name="description" 
                                placeholder="Brief description of the team's purpose"
                            />
                        </div>

                        <div className='grid gap-2'>
                            <Label htmlFor="team_coordinator">Team Coordinator</Label>
                            <Select name="team_coordinator" required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select event coordinator" />
                                </SelectTrigger>
                                <SelectContent>
                                    {isLoadingMembers ? (
                                        <SelectItem value="loading" disabled>
                                            Loading coordinators...
                                        </SelectItem>
                                    ) : (
                                        allMembers?.map((user: any) => (
                                            <SelectItem key={user.id} value={user.id}>
                                                {user.name}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                    </section>

                    <DialogFooter>
                        <Button type="submit">Create Team</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}