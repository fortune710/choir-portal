import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function NewTeamDialog() {

    const [open, setOpen] = useState(false)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      // Handle form submission logic here
      setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Team
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Team</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Team Name</Label>
                <Input id="name" required />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input id="description" required />
              </div>
              <Button type="submit">Add Team</Button>
            </form>
          </DialogContent>
        </Dialog>

    )
}