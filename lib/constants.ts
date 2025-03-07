export const permissionsList = [
    {
        category: "Members",
        permissions: [
            { 
                id: "members.view", 
                label: "View Members",
                description: "Can view member profiles and list of all members"
            },
            { 
                id: "members.create", 
                label: "Create Members",
                description: "Can add new members to the system"
            },
            { 
                id: "members.edit", 
                label: "Edit Members",
                description: "Can modify member information and profiles"
            },
            { 
                id: "members.delete", 
                label: "Delete Members",
                description: "Can remove members from the system"
            },
        ]
    },
    {
        category: "Songs",
        permissions: [
            { 
                id: "songs.view", 
                label: "View Songs",
                description: "Can view song details and access song library"
            },
            { 
                id: "songs.create", 
                label: "Create Songs",
                description: "Can add new songs to the library"
            },
            { 
                id: "songs.edit", 
                label: "Edit Songs",
                description: "Can modify song details, lyrics, and attachments"
            },
            { 
                id: "songs.delete", 
                label: "Delete Songs",
                description: "Can remove songs from the library"
            },
            { 
                id: "songs.download", 
                label: "Download Songs",
                description: "Can download song files and attachments"
            },
        ]
    },
    {
        category: "Roles",
        permissions: [
            { 
                id: "roles.view", 
                label: "View Roles",
                description: "Can view role definitions and assignments"
            },
            { 
                id: "roles.create", 
                label: "Create Roles",
                description: "Can create new roles and define permissions"
            },
            { 
                id: "roles.edit", 
                label: "Edit Roles",
                description: "Can modify existing role permissions and settings"
            },
            { 
                id: "roles.delete", 
                label: "Delete Roles",
                description: "Can remove roles from the system"
            },
            { 
                id: "roles.assign", 
                label: "Assign Roles",
                description: "Can assign or remove roles from members"
            },
        ]
    },
    {
        category: "Teams",
        permissions: [
            { 
                id: "teams.view", 
                label: "View Teams",
                description: "Can view team details and member lists"
            },
            { 
                id: "teams.create", 
                label: "Create Teams",
                description: "Can create new teams in the system"
            },
            { 
                id: "teams.edit", 
                label: "Edit Teams",
                description: "Can modify team details and settings"
            },
            { 
                id: "teams.delete", 
                label: "Delete Teams",
                description: "Can remove teams from the system"
            },
            { 
                id: "teams.manage_members", 
                label: "Manage Team Members",
                description: "Can add or remove members from teams"
            },
        ]
    },
    {
        category: "Settings",
        permissions: [
            { 
                id: "settings.view", 
                label: "View Settings",
                description: "Can view system and application settings"
            },
            { 
                id: "settings.edit", 
                label: "Edit Settings",
                description: "Can modify basic system settings"
            },
            { 
                id: "settings.manage_system", 
                label: "Manage System Settings",
                description: "Can modify advanced system configurations and security settings"
            },
        ]
    }
]
