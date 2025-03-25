"use client"
import { Badge } from '@/components/ui/badge'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Pencil, UserMinus, Trash } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';
import EditMemberDialog from './edit-member-dialog';
import DeactivateMemberAlert from './deactivate-member-alert';
import DeleteMemberAlert from './delete-member-dialog';
import { User } from '@prisma/client';
import React from 'react';
import { Separator } from '../ui/separator';

type Member = Pick<User, "id" | "name" | "email" | "phone_number" | "birthday" | "vocalCategory" | "avatar" | "isActive">

interface MembersTableProps {
    members: Array<Member>
}

export default function MembersTable({ members }: MembersTableProps) {
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deactivateAlertOpen, setDeactivateAlertOpen] = useState(false);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);

  const openEditDialog = (id: string) => {
    setSelectedMemberId(id);
    setEditDialogOpen(true);
  };

  const openDeactivateAlert = (id: string) => {
    setSelectedMemberId(id);
    setDeactivateAlertOpen(true);
  };

  const openDeleteAlert = (id: string) => {
    setSelectedMemberId(id);
    setDeleteAlertOpen(true);
  };

  const selectedMember = selectedMemberId ? members.find(member => member.id === selectedMemberId) : null;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead />
          <TableHead>Profile</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Vocal Category</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member, index) => (
          <React.Fragment key={member.id}>
            <TableRow>
              <TableCell>
                <p>{index + 1}</p>
              </TableCell>
              <TableCell>
                <Avatar>
                  <AvatarImage src={member.avatar ?? ""} />
                  <AvatarFallback>{member.name.at(0)}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{member.name}</TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>{member.phone_number ?? ""}</TableCell>
              <TableCell>
                {member.vocalCategory && <Badge className='capitalize'>{member.vocalCategory}</Badge>}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <Separator />
                    <DropdownMenuItem onClick={() => openEditDialog(member.id)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => openDeactivateAlert(member.id)}>
                      <UserMinus className="mr-2 h-4 w-4" />
                      Deactivate
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => openDeleteAlert(member.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>

            {selectedMember && (
              <>
                <EditMemberDialog
                  open={editDialogOpen}
                  onOpenChange={setEditDialogOpen}
                  member={selectedMember}
                />
                <DeactivateMemberAlert
                  open={deactivateAlertOpen}
                  onOpenChange={setDeactivateAlertOpen}
                  memberId={selectedMember.id}
                  memberName={selectedMember.name}
                />
                <DeleteMemberAlert
                  open={deleteAlertOpen}
                  onOpenChange={setDeleteAlertOpen}
                  memberId={selectedMember.id}
                  memberName={selectedMember.name}
                />
              </>
            )}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
}