"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Book, BookOpen, Component, Maximize, Palette, Ruler, Sparkles, Type } from "lucide-react"

import { componentDocs } from "@/lib/docs"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader className="border-b px-4 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Book className="size-4" />
          </div>
          <span className="text-lg font-semibold tracking-tight">Docs Design</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Getting Started</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/"}>
                  <Link href="/">
                    <BookOpen className="size-4" />
                    <span>Introduction</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/tokens"}>
                  <Link href="/tokens">
                    <Palette className="size-4" />
                    <span>Colors</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/spacing"}>
                  <Link href="/spacing">
                    <Ruler className="size-4" />
                    <span>Spacing</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/effects"}>
                  <Link href="/effects">
                    <Sparkles className="size-4" />
                    <span>Effects</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/typography"}>
                  <Link href="/typography">
                    <Type className="size-4" />
                    <span>Typography</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/sizing"}>
                  <Link href="/sizing">
                    <Maximize className="size-4" />
                    <span>Sizing &amp; Layout</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Components</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {componentDocs.map((doc) => {
                const href = `/components/${doc.slug}`
                return (
                  <SidebarMenuItem key={doc.slug}>
                    <SidebarMenuButton asChild isActive={pathname === href}>
                      <Link href={href}>
                        <Component className="size-4" />
                        <span>{doc.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t px-4 py-3 text-xs text-muted-foreground">
        &copy; 2026 Docs Design
      </SidebarFooter>
    </Sidebar>
  )
}
