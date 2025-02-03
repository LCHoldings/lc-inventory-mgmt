import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { StatusManagement } from "@/components/tables/status-management"
import { DashHeader } from '@/components/dash-header';
import AuthWrapper from '@/components/auth-wrapper';

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
                    <DashHeader title="Status Presets" breadcrumbs={breadcrumbs} />
                    <div className="flex flex-1 flex-col gap-4 p-8">
                        <StatusManagement />
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </AuthWrapper>
    )
}
