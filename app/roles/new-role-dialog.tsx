'use client'

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox';

export default function NewRolwDialog() {
    return (
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> 
              Add Role
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form action="">
                <DialogHeader>
                    <DialogTitle>Add New Role</DialogTitle>
                </DialogHeader>
                
                <section className="space-y-4 mt-3">
                    <div className='grid gap-2'>
                        <Label htmlFor="name">Role Name</Label>
                        <Input id="name" required />
                    </div>
                    <div className='flex items-center gap-3'>
                        <Checkbox id="is_admin" required />
                        <Label htmlFor="is_admin">Role can perform Administrative Purposes</Label>
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