
import { Badge } from '@/components/ui/badge'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Image from 'next/image'
import { Button } from '../ui/button';
import { MoreHorizontal } from 'lucide-react';

interface MembersTableProps {
    members: {
        [key: string]: any;
    }[]
}

export default function MembersTable({ members }: MembersTableProps) {
    return (
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead/>
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
          {members.map((member, index) => (
            <TableRow key={member.id}>
                <TableCell>
                    <p>{index + 1}</p>
                </TableCell>
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
                {member.roles.map((role: any) => (
                  <Badge key={role} className="mr-1">
                    {role}
                  </Badge>
                ))}
              </TableCell>
              <TableCell>
                <Button variant="outline" size="icon">
                    <MoreHorizontal/>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
}