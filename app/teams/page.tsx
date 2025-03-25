import * as React from 'react'
import { Filter, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import NewTeamDialog from '@/components/teams/new-team-dialog'
import TeamsTable from '@/components/teams/teams-table'
import { getTeams } from '@/services/teamsService'

export default async function TeamsPage() {
  const teamsData = await getTeams()
  
  // Transform the data to include member count
  const teams = teamsData.map((team) => ({
    id: team.id,
    name: team.name,
    description: team.description || '',
    memberCount: team.users.length,
    createdAt: team.created_at,
    coordinatorId: team.coordinator_user_id ?? "",
  }))

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Teams</h1>
          <p className="text-muted-foreground">Manage your teams and their members</p>
        </div>
        <div className="flex items-center gap-2">
          <NewTeamDialog />
        </div>
      </div>

      <div className="flex-1">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search teams" className="pl-8" />
          </div>
          <Button variant="outline" className="sm:w-auto">
            <Filter className="mr-2 h-4 w-4" /> Sort
          </Button>
        </div>

        {teams.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[400px] border rounded-lg">
            <p className="text-xl font-medium text-muted-foreground mb-2">No teams found</p>
            <p className="text-sm text-muted-foreground mb-4">Get started by creating your first team</p>
            <NewTeamDialog />
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <TeamsTable teams={teams} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}