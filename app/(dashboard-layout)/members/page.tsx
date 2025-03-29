
import * as React from 'react'

import NewMemberForm from '@/components/members/new-member-dialog'
import { getUsers } from '@/services/usersService'
import { Card, CardContent } from '@/components/ui/card';
import MembersTable from '@/components/members/members-table';
import Searchbar from '@/components/searchbar';


export default async function MembersPage() {

  const users = await getUsers();
  const members = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    phone_number: user.phone_number,
    avatar: user.avatar,
    vocalCategory: user.vocalCategory,
    isActive: user.isActive,
    birthday: user.birthday,
  }))

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Members</h1>
          <p className="text-muted-foreground">View all your members in one place</p>
        </div>
        <div className="flex items-center gap-2">
          <NewMemberForm/>
        </div>
      </div>

      <div className="flex-1">
        <Searchbar placeholder='Search members' />

        {members.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[400px] border rounded-lg">
            <p className="text-xl font-medium text-muted-foreground mb-2">No members found</p>
            <p className="text-sm text-muted-foreground mb-4">Get started by adding your first member</p>
            <NewMemberForm/>
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <MembersTable members={members} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}