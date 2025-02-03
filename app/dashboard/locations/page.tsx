import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { LocationManagement } from '@/components/tables/location-management'
import { DashHeader } from "@/components/dash-header"
import AuthWrapper from "@/components/auth-wrapper"


const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard' },
]

export default function Page() {
    return (
        <AuthWrapper>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <DashHeader title="Locations" breadcrumbs={breadcrumbs} />
                    <div className="flex flex-1 flex-col gap-4 p-8">
                        <LocationManagement />
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </AuthWrapper>
    )
}