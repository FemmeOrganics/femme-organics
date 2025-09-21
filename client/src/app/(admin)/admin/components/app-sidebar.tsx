'use client'

import React from 'react'
import { cn } from "@/lib/utils"
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { 
  SettingsIcon, 
  ShoppingCartIcon, 
  WalletCards, 
  BoxesIcon, 
  PresentationIcon, 
  TruckIcon,
  HomeIcon,
  User,
  ChevronDownIcon,
  ChartAreaIcon,
  Home,
  ChevronRight,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useMemo } from "react";
import DarkModeButton from '@/components/DarkModeButton'
import LogoutBtn from '@/components/LogoutBtn'
import { MessageNotification } from '@/components/Notification'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
  };
}

function MainNav({ className, user, ...props }: MainNavProps) {
  const pathname = usePathname();
  const params = useParams()
  const {open, setOpen } = useSidebar()

  const routes = useMemo(() => [
     {
      href: `/admin`,
      label: 'Home',
      icon: <Home size={20} />,
      active: pathname === `/admin`
    },
    {
      href: `/admin/${params.storeId}`,
      label: 'Overview',
      icon: <ChartAreaIcon size={20} />,
      active: pathname === `/admin/${params.storeId}`
    },
    {
      href: `/admin/${params.storeId}/billboards`,
      label: 'Billboards',
      icon: <PresentationIcon size={20} />,
      active: pathname.includes("billboards")
    },
    {
      href: `/admin/${params.storeId}/categories`,
      label: 'Categories',
      icon: <BoxesIcon size={20} />,
      active: pathname.includes("categories")
    },
    {
      href: `/admin/${params.storeId}/products`,
      label: 'Products',
      icon: <ShoppingCartIcon size={20} />,
      active: pathname.includes("products")
    },
    {
      href: `/admin/${params.storeId}/orders`,
      label: 'Orders',
      icon: <WalletCards size={20} />,
      active: pathname.includes("orders")
    },
    {
      href: `/admin/${params.storeId}/delivery/pick-and-drop`,
      label: 'Pickup & Delivery',
      icon: <TruckIcon size={20} />,
      active: pathname.includes(`/admin/${params.storeId}/delivery/pick-and-drop`),
      children: [
        {
          href: `/admin/${params.storeId}/delivery/pick-and-drop`,
          label: 'Pick & Drop',
          active: pathname.includes("pick-and-drop"),
        },
        {
          href: `/admin/${params.storeId}/delivery/pickup-mtaani`,
          label: 'Pick-Up Mtaani',
          active: pathname.includes("pickup-mtaani"),
        },
      ]
    },
    {
      href: `/admin/${params.storeId}/settings`,
      label: 'Store Settings',
      icon: <SettingsIcon size={20} />,
      active: pathname.includes(`/admin/${params.storeId}/settings`)
    }
  ], [params.storeId, pathname])

  return (
    <Sidebar
      {...props}
      className={cn('p-0', className)}
      collapsible="icon"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((route) => {
                if (route.children) {
                  const isActive = route.active
                  return (
                    <Collapsible
                      key={route.label}
                      asChild
                      open={isActive}
                      defaultOpen={isActive}
                    >
                      <SidebarMenuItem >
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            isActive={isActive}
                            tooltip={route.label}
                            className="w-full flex justify-between"
                          >
                              <Link href={route.href} className='flex items-center gap-2'>
                                    {route.icon}
                                    <span className={open ? "block": "hidden"}>{route.label}</span>
                                </Link>
                                {isActive ? <ChevronDownIcon /> : <ChevronRight />}
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenu>
                            {route.children.map((child) => {
                              const isChildActive = pathname === child.href || pathname.startsWith(child.href)
                              return (
                                <SidebarMenuItem key={child.label}>
                                  <SidebarMenuButton asChild isActive={isChildActive}>
                                    <Link href={child.href}>
                                      <span className="pl-6 text-sm">{child.label}</span>
                                    </Link>
                                  </SidebarMenuButton>
                                </SidebarMenuItem>
                              )
                            })}
                          </SidebarMenu>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  )
                }

                const isActive = pathname === route.href || pathname.startsWith(route.href)
                return (
                  <SidebarMenuItem key={route.label}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={route.label}
                    >
                      <Link href={route.href}>
                        {route.icon}
                        <span>{route.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              
              {/* Action Buttons */}
              <SidebarMenuItem>
                <div className={cn(open ? "flex-row" : "flex-col" ,"flex items-center gap-2 p-2")}>
                  <DarkModeButton />

                  <LogoutBtn open={open}/>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  )
}

export default MainNav