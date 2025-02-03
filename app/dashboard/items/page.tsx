import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { DashHeader } from "@/components/dash-header"
import { ItemManagement } from "@/components/tables/item-management"
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
                    <DashHeader title="Items" breadcrumbs={breadcrumbs} />
                    <div className="flex flex-1 flex-col gap-4 p-8">
                        <ItemManagement />
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </AuthWrapper>
    )
}