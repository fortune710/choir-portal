
import * as React from 'react'
import Image from 'next/image'

import { Badge } from '@/components/ui/badge'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import NewMemberForm from './new-member-dialog'
import { getUsers } from '@/services/usersService'
// import { getUsers } from "../api/services/membersService";

// const members = await getUsers(); // directly from DB
const members = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    roles: ['Admin', 'Singer'],
    profilePicture: '/placeholder.svg?height=40&width=40',
  },
  // Add more members...
]

export default async function MembersPage() {

  const users = await getUsers();
  const members = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone_number,
    avatar: user.avatar,
    roles: user.roles.map((role) => role.role.name)
  }))

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Members</h1>
        <NewMemberForm/>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Profile</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Roles</TableHead>
            <TableHead/>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Will create UI for empty state */}
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell>
                <Image
                  src={member.avatar || "/placeholder.svg"}
                  alt={member.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </TableCell>
              <TableCell>{member.name}</TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>{member.phone}</TableCell>
              <TableCell>
                {member.roles.map((role) => (
                  <Badge key={role} className="mr-1">
                    {role}
                  </Badge>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}