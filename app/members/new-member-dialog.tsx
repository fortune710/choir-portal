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
                            <Input id="name" required />
                        </div>

                        <div className='grid gap-2'>
                            <Label htmlFor="email">Member Email</Label>
                            <Input id="email" type='email' required />
                        </div>

                        <div className='grid gap-2'>
                            <Label htmlFor="phone">Member Phone Number</Label>
                            <Input id="phone" required />
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