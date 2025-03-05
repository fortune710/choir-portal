import * as React from 'react'
import { Filter, MoreHorizontal, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

import NewRoleDialog from './new-role-dialog'
import { getRoles } from '@/services/rolesService'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import RolesTable from '@/components/roles/roles-table'

export default async function RolesPage() {
  const roles = await getRoles();
  const formattedRoles = roles.map((role) => ({
    id: role.id,
    memberCount: role._count.users,
    permissionsCount: 0,
    createdAt: role.createdAt,
    name: role.name
  }))

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Roles</h1>
          <p className="text-muted-foreground">Access and manage all your roles and permissions</p>
        </div>
        <div className="flex items-center gap-2">
          <NewRoleDialog/>
        </div>
      </div>
      

      <div className="flex-1">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search Roles" className="pl-8" />
          </div>
          <Button variant="outline" className="sm:w-auto">
            <Filter className="mr-2 h-4 w-4" /> Sort
          </Button>
        </div>



        {roles.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[400px] border rounded-lg">
            <p className="text-xl font-medium text-muted-foreground mb-2">No roles found</p>
            <p className="text-sm text-muted-foreground mb-4">Get started by adding your first role</p>
            <NewRoleDialog />
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <RolesTable roles={formattedRoles}/>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}