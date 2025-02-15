'use client'

import * as React from 'react'
import { Home, Users, UsersRound, Music, Calendar } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'

const menuItems = [
  { title: 'Home', icon: Home, href: '/' },
  { title: 'Members', icon: Users, href: '/members' },
  { title: 'Teams', icon: UsersRound, href: '/teams' },
  { title: 'Songs', icon: Music, href: '/songs' },
  { title: 'Events', icon: Calendar, href: '/events' },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-screen">
        <Sidebar>
          <SidebarHeader>
            <h2 className="text-xl font-bold">Dashboard</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1">
          <header className="flex h-16 items-center border-b px-4">
            <SidebarTrigger />
          </header>
          <main className="p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}