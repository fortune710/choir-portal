'use client'

import { createUser } from '@/actions/members'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

export default function NewMemberForm() {
    //Wouldn't need this normally but this will help us close 
    // the dialog after operation for better UX
    const [dialogOpen, setDialogOpen] = useState(false);

    const createMember = async (formData: FormData) => {
        const memberName = formData.get("name")?.toString() ?? "";

        try {
            await createUser(formData);
            toast.success("Member Created Successfully", {
                description: `${memberName} has been added to the system`,
            });

            //Purposely didn't use a return statement as action on prop in 
            // <form/> element only allows functions with return type void
            setDialogOpen(false);

        } catch (error: any) {
            toast.error("Error Creating Member", {
                description: error.message || 
                `${memberName} could not be added to the system`,
            })
        }
    }


    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Member
                </Button>
            </DialogTrigger>

            <DialogContent>
                <form action={createMember}>
                    <DialogHeader>
                        <DialogTitle>Add New Member</DialogTitle>
                    </DialogHeader>

                    <section className="space-y-4 my-3">
                        <div className='grid gap-2'>
                            <Label htmlFor="name">Member Name</Label>
                            <Input name='name' id="name" required />
                        </div>

                        <div className='grid gap-2'>
                            <Label htmlFor="email">Member Email</Label>
                            <Input name='email' id="email" type='email' required />
                        </div>

                        <div className='grid gap-2'>
                            <Label htmlFor="phone">Member Phone Number</Label>
                            <Input name='phone_number' id="phone" required />
                        </div>

                        <div className='grid gap-2'>
                            <Label htmlFor="vocal_category">Vocal Category</Label>
                            <Select name='vocal_category'>
                                <SelectTrigger name='vocal_category'>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='soprano'>Soprano</SelectItem>
                                    <SelectItem value='alto'>Alto</SelectItem>
                                    <SelectItem value='tenor'>Tenor</SelectItem>
                                    <SelectItem value='bass'>Bass</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className='grid gap-2'>
                            <Label htmlFor="birthday">Birthday</Label>
                            <Input name='birthday' id="birthday" type='date' required />
                        </div>

                        {/* Will Add select for Roles Later */}
                    </section>
                    
                    <DialogFooter>
                        <Button type="submit">Add Member</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}