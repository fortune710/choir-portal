'use client'

import * as React from 'react'
import { Home, Users, UsersRound, Music, Calendar, ContactRound } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
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
  { title: 'Roles', icon: ContactRound, href: '/roles' },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-screen">
        <Sidebar aria-describedby='Sidebar Menu'>
          <SidebarHeader className='bg-background'>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                  <Link href="/">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      <Image src="/jhdc-logo.png" alt='Logo' width={32} height={32} className='w-full h-full rounded-lg'  />
                    </div>
                    <div className="flex flex-col gap-0.5 leading-none">
                      <span className="font-semibold">RCCG</span>
                      <span className="">Jesus House DC</span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent aria-describedby='Sidebar Menu' className='px-2 bg-background'>
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
        <div className="flex-1 max-md:w-screen">
          <header className="flex h-16 items-center border-b px-4">
            <SidebarTrigger />
          </header>
          <main className="p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}