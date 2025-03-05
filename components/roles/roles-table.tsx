import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface RolesTableProps {
    roles: Array<{
        id: string,
        name: string,
        memberCount: number,
        createdAt: Date,
        permissionsCount: number,
    }>
}

export default function RolesTable({ roles }: RolesTableProps) {

    return (
        <Table>
            <TableHeader>
              <TableRow>
                <TableHead/>
                <TableHead>Role Name</TableHead>
                <TableHead>Member Count</TableHead>
                <TableHead>Permissions Count</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role, index) => (
                <TableRow key={role.id}>
                    <TableCell>{index + 1}</TableCell>
                  <TableCell>{role.name}</TableCell>
                  <TableCell>{role.memberCount}</TableCell>
                  <TableCell>{role.permissionsCount}</TableCell>
                  <TableCell>{role.createdAt.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
    )
}