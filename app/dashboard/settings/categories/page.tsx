import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { CategoryManagement } from "@/components/category-management"
import { DashHeader } from '@/components/dash-header'
import AuthWrapper from "@/components/auth-wrapper"

const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Settings', href: '/dashboard/settings' },
]

export default function Page() {
    return (
        <AuthWrapper>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <DashHeader title="Categories" breadcrumbs={breadcrumbs} />
                    <CategoryManagement />
                </SidebarInset>
            </SidebarProvider>
        </AuthWrapper>
    )
}

