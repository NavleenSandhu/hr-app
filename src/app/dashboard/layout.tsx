import React, { ReactNode } from 'react'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import AppSidebar from '../components/app-sidebar'
import Header from '../components/header'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <Header />
                    <div>{children}</div>
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}

export default DashboardLayout