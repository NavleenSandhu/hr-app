'use client';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react";


const AppSidebar = () => {
    const [data, setData] = useState([
        {
            name: 'Employees',
            isOpen: true,
            children: [
                {
                    name: 'View Employees',
                    link: 'dashboard/'
                },
                {
                    name: 'Add an Employee',
                    link: 'dashboard/'
                },
            ]
        },
        {
            name: 'Departments',
            isOpen: false,
            children: [
                {
                    name: 'View Departments',
                    link: 'dashboard/'
                },
                {
                    name: 'Add a Department',
                    link: 'dashboard/'
                },
            ]
        }
    ])

    const [clicked, setClicked] = useState(data[0].children[0].link)

    const handleOpen = (index: number) => {
        const newData = [...data]
        newData[index].isOpen = !newData[index].isOpen
        setData(newData)
    }

    return (
        <Sidebar>
            <SidebarHeader className="text-xl font-bold">HR</SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {
                                data.map((item) =>
                                    <Collapsible key={item.name} open={item.isOpen} onOpenChange={() => handleOpen(data.indexOf(item))}>
                                        <CollapsibleTrigger className="text-base" asChild>
                                            <SidebarMenuButton>
                                                <span>{item.name}</span>
                                                <ChevronRight className={`ml-auto transition-transform duration-200 ${item.isOpen ? 'rotate-90' : ''}`} />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {
                                                    item.children.map((subItem) =>
                                                        <SidebarMenuSubItem key={subItem.name} className={`${clicked === subItem.link ? 'rounded-md bg-accent' : ''}`} onClick={() => setClicked(subItem.link)}>
                                                            <Link href={subItem.link}>
                                                                <SidebarMenuSubButton>
                                                                    {subItem.name}
                                                                </SidebarMenuSubButton>
                                                            </Link>
                                                        </SidebarMenuSubItem>
                                                    )
                                                }
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </Collapsible>
                                )
                            }
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}

export default AppSidebar