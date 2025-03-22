'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { assignMember, removeMember } from "@/actions/event-member";
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useMembers } from "@/hooks/use-member"
import { User } from "@prisma/client"
import { useEventMembers } from "@/hooks/use-event-members"

interface ManageMembersDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  eventId: string
  eventName: string
}



export default function ManageMembersDialog({
  open,
  onOpenChange,
  eventId,
  eventName,
}: ManageMembersDialogProps) {
  const [search, setSearch] = useState("")
  const queryClient = useQueryClient()

  const { data: eventMembers, isLoading: loadingMembers } = useEventMembers(eventId, open);

  const { allMembers: availableMembers, isLoadingMembers } = useMembers(open);

  const { mutate: assignMemberMutation } = useMutation({
    mutationFn: (memberId: string) => assignMember(eventId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eventMembers', eventId] })
      toast.success('Member assigned successfully')
    },
  })

  const { mutate: removeMemberMutation } = useMutation({
    mutationFn: (memberId: string) => removeMember(eventId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eventMembers', eventId] })
      toast.success('Member removed successfully')
    },
  })

  const filteredAvailableMembers = availableMembers?.filter(member => 
    !eventMembers?.some(em => em.id === member.id) &&
    member.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Manage Members for {eventName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search members..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1"
            />
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Assigned Members</h3>
              <ScrollArea className="h-[200px]">
                {loadingMembers ? (
                  <div>Loading members...</div>
                ) : (
                  <div className="space-y-2">
                    {eventMembers?.map((em: any) => (
                      <div
                        key={em.member.id}
                        className="flex items-center justify-between p-2 rounded-lg border"
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={em.member.avatar} />
                            <AvatarFallback>
                              {em.member.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{em.member.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {em.member.vocalCategory}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeMemberMutation(em.member.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </div>

            <div>
              <h3 className="font-medium mb-2">Available Members</h3>
              <ScrollArea className="h-[200px]">
                {isLoadingMembers ? (
                  <div>Loading available members...</div>
                ) : (
                  <div className="space-y-2">
                    {filteredAvailableMembers?.map((member: any) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-2 rounded-lg border"
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>
                              {member.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {member.vocalCategory}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => assignMemberMutation(member.id)}
                        >
                          Assign
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}