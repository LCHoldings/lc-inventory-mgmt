import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { SupplierManagement } from '@/components/tables/supplier-management'
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
                    <DashHeader title="Product Models" breadcrumbs={breadcrumbs} />
                    <div className="flex flex-1 flex-col gap-4 p-8">
                        <SupplierManagement />
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </AuthWrapper>
    )
}