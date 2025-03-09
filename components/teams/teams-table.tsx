import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TeamActions from './team-actions';


interface TeamsListProps {
  teams: {
    id: string;
    name: string;
    description: string;
    memberCount: number;
  }[];
}

export default function TeamsTable({ teams }: TeamsListProps) {
    return (
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead/>
            <TableHead>Team Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Members</TableHead>
            <TableHead/>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teams.map((team, index) => (
            <TableRow key={team.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{team.name}</TableCell>
              <TableCell>{team.description}</TableCell>
              <TableCell>{team.memberCount}</TableCell>
              <TableCell>
                <TeamActions 
                  teamId={team.id}
                  teamName={team.name}
                  teamDescription={team.description}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
}