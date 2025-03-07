'use client'

import { createRole } from '@/actions/roles'
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
import { Checkbox } from '@/components/ui/checkbox'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function NewRoleDialog() {
    const [dialogOpen, setDialogOpen] = useState(false);

    const createNewRole = async (formData: FormData) => {
        const roleName = formData.get("name")?.toString() ?? "";

        try {
            const result = await createRole(formData);
            if (result.success) {
                toast.success("Role Created Successfully", {
                    description: `${roleName} has been added to the system`,
                });
                setDialogOpen(false);
            } else {
                throw new Error(result.error);
            }
        } catch (error: any) {
            toast.error("Error Creating Role", {
                description: error.message || 
                `${roleName} could not be added to the system`,
            });
        }
    }

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> 
                    Add Role
                </Button>
            </DialogTrigger>
            <DialogContent>
                <form action={createNewRole}>
                    <DialogHeader>
                        <DialogTitle>Add New Role</DialogTitle>
                        <DialogDescription>
                            You will be able to add permissions later
                        </DialogDescription>
                    </DialogHeader>
                    
                    <section className="space-y-4 my-3">
                        <div className='grid gap-2'>
                            <Label htmlFor="name">Role Name</Label>
                            <Input id="name" name="name" required />
                        </div>
                        
                    </section>

                    <DialogFooter>
                        <Button type="submit">Add Role</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}