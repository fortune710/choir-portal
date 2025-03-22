'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { getRolePermissions, assignPermissionsToRole } from '@/services/rolesService'
import { toast } from 'sonner'
import { Button } from './ui/button'
import { permissionsList } from '@/lib/constants'
import { updateRolePermissions } from '@/actions/roles'
import { useQueryState } from 'nuqs'

interface PermissionsDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    trigger?: React.ReactNode,
    roleId: string,
    roleName: string,
}

async function fetchRolePermissions(roleId: string) {
    const response = await fetch(`/api/roles/${roleId}`)
    if (!response.ok) {
        throw new Error('Failed to fetch role permissions')
    }
    return response.json()
}

export default function PermissionsDialog({
    open,
    onOpenChange,
    trigger,
    roleId,
    roleName,
}: PermissionsDialogProps) {
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
    const [, setSelectedRoleId] = useQueryState('roleId');
    
    const queryClient = useQueryClient()

    // Query for role permissions
    const { isLoading } = useQuery({
        queryKey: ['rolePermissions', roleId],
        queryFn: async () => {
            const data = await fetchRolePermissions(roleId)
            setSelectedPermissions(data)
        },
        enabled: !!roleId && open,
    })

    // Mutation for updating permissions
    const { mutate: updatePermissions, isPending } = useMutation({
        mutationFn: () => updateRolePermissions(roleId, selectedPermissions),
        onSuccess: () => {
            onOpenChange(false)
            setSelectedRoleId(null);
            toast.success("Permissions updated successfully")
            queryClient.invalidateQueries({ queryKey: ['rolePermissions'] })
        },
        onError: (e) => {
            toast.error("Failed to update permissions" + e.message)
        },
    })

    const handlePermissionChange = (permissionId: string) => {
        setSelectedPermissions(current => {
            if (current.includes(permissionId)) {
                return current.filter(id => id !== permissionId)
            } else {
                return [...current, permissionId]
            }
        })
    }

    const handleCategoryChange = (category: string) => {
        const categoryPermissions = permissionsList
            .find(c => c.category === category)
            ?.permissions.map(p => p.id) ?? []

        setSelectedPermissions(current => {
            const otherPermissions = current.filter(
                id => !categoryPermissions.includes(id)
            )

            // If all category permissions are selected, unselect them
            if (categoryPermissions.every(id => current.includes(id))) {
                return otherPermissions
            }
            // Otherwise, select all category permissions
            return [...otherPermissions, ...categoryPermissions]
        })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {trigger}
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Manage Permissions</DialogTitle>
                    <DialogDescription>Add and remove permissions for this role</DialogDescription>
                </DialogHeader>

                <section>
                    <div className="mb-4 p-2 border rounded-lg">
                        <h4 className="text-sm font-medium mb-2">Selected Role</h4>
                        {isLoading ? (
                            <div className="h-6 w-24 bg-muted animate-pulse rounded" />
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                {roleName}
                            </p>
                        )}
                    </div>
                    <ScrollArea className="h-[400px] pr-4">
                        <div className="space-y-6">
                            {permissionsList.map((category) => (
                                <div key={category.category} className="space-y-3">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`category-${category.category}`}
                                            checked={category.permissions.every(
                                                p => selectedPermissions.includes(p.id)
                                            )}
                                            onCheckedChange={() => handleCategoryChange(category.category)}
                                        />
                                        <Label 
                                            htmlFor={`category-${category.category}`}
                                            className="text-sm font-semibold"
                                        >
                                            {category.category}
                                        </Label>
                                    </div>
                                    <div className="ml-6 space-y-2">
                                        {category.permissions.map((permission) => (
                                            <div 
                                                key={permission.id} 
                                                className="flex flex-col space-y-1"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={permission.id}
                                                        checked={selectedPermissions.includes(permission.id)}
                                                        onCheckedChange={() => handlePermissionChange(permission.id)}
                                                    />
                                                    <Label htmlFor={permission.id}>
                                                        {permission.label}
                                                    </Label>
                                                </div>
                                                <p className="text-sm text-muted-foreground ml-6">
                                                    {permission.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </section>

                <DialogFooter>
                    <Button 
                        onClick={() => updatePermissions()}
                        disabled={isPending || selectedPermissions.length === 0}
                    >
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
