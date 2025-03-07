'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
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
import { useState } from 'react'
import PermissionsDialog from '../permissions-dialog'
import { toast } from 'sonner'
import { deleteRole } from '@/actions/roles'
import { useQueryState } from 'nuqs'
import DeleteRoleAlert from './delete-role-alert'

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
    const [permissionsOpen, setPermissionsOpen] = useState(false)
    const [selectedRoleId, setSelectedRoleId] = useQueryState('roleId')
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [roleToDelete, setRoleToDelete] = useState<{ id: string, name: string } | null>(null)

    const handleDeleteRole = async (roleId: string, roleName: string) => {
        setRoleToDelete({ id: roleId, name: roleName })
        setDeleteOpen(true)
    }

    const confirmDelete = async () => {
        if (!roleToDelete) return

        try {
            await deleteRole(roleToDelete.id)
            toast.success("Role Deleted", {
                description: `${roleToDelete.name} has been deleted successfully`
            })
            setDeleteOpen(false)
            setRoleToDelete(null);
        } catch (error) {
            toast.error("Error Deleting Role", {
                description: `${roleToDelete.name} could not be deleted`
            })
        }
    }

    const handleManagePermissions = (roleId: string) => {
        setSelectedRoleId(roleId)
        setPermissionsOpen(true)
    }

    const getRoleName = (id: string) => {
      if (!id) return "";

      return roles.find(role => role.id === id)?.name
    }

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead/>
                        <TableHead>Role Name</TableHead>
                        <TableHead>Member Count</TableHead>
                        <TableHead>Permissions Count</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead/>
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
                                      <DropdownMenuLabel>
                                        Actions
                                      </DropdownMenuLabel>
                                      <DropdownMenuSeparator/>
                                        <DropdownMenuItem 
                                            onClick={() => handleManagePermissions(role.id)}
                                        >
                                            Manage Permissions
                                        </DropdownMenuItem>
                                        <DropdownMenuItem 
                                            onClick={() => handleDeleteRole(role.id, role.name)}
                                            className="text-destructive"
                                        >
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <PermissionsDialog 
                open={permissionsOpen} 
                onOpenChange={setPermissionsOpen}
                roleId={selectedRoleId!}
                roleName={getRoleName(selectedRoleId!)!}
            />

            <DeleteRoleAlert 
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                onConfirm={confirmDelete}
                roleName={roleToDelete?.name ?? ''}
            />
        </>
    )
}