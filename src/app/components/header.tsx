"use client"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import { usePathname } from 'next/navigation'

const Header = () => {
    const pathname = usePathname()
    const pathnames = pathname.split('/').filter(Boolean).map((path: string) => {
        let displayName
        if (path.indexOf('-') > -1) {
            displayName = path.split('-').map((value) => {
                return value.charAt(0).toUpperCase() + value.slice(1)
            }).join(' ')
        } else {
            displayName = path.charAt(0).toUpperCase() + path.slice(1)
        }
        const obj = {
            name: path,
            displayName
        }
        return obj
    })

    const generateBreadcrumbs = () => {
        return pathnames.map((value, index) => {
            const href = '/' + pathnames.slice(0, index + 1).map((value) => value.name).join('/')
            return (
                <React.Fragment key={href}>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={href}>{value.displayName}</BreadcrumbLink>
                    </BreadcrumbItem>
                    {index < pathnames.length - 1 && <BreadcrumbSeparator />}
                </React.Fragment>
            )
        })
    }
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <Breadcrumb>
                <BreadcrumbList>
                    {generateBreadcrumbs()}
                </BreadcrumbList>
            </Breadcrumb>
        </header>
    )
}

export default Header