"use client"

// React and hooks
import { useState, useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type * as z from "zod"

// Icons
import { Pen, Trash2, Plus, CheckCircle2, X } from "lucide-react"

// AG Grid
import { AgGridReact } from "ag-grid-react"
import { type ColDef, type ICellRendererParams } from "ag-grid-community"

// React Query
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

// UI components
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import ItemForm from "@/components/item-form"
import ImageCellRenderer from "@/components/image-cell-renderer"
import toast from "react-hot-toast"

// Schemas and types
import ItemSchema from '@/lib/schemas/ItemSchema';
import type { Category, Item, Manufacturer, Model, Status, Supplier, Location } from "@/lib/types"

// API functions
import { fetchItems, updateItem, deleteItem, createItem } from "@/lib/itemsApi"
import { fetchModels } from "@/lib/modelsApi"
import { fetchManufacturers } from "@/lib/manufacturersApi"
import { fetchCategories } from "@/lib/categoriesApi"
import { fetchSuppliers } from "@/lib/suppliersApi"
import { fetchLocations } from "@/lib/locationsApi"
import { fetchStatuses } from "@/lib/statusApi"

// Loader component
import Loader from "@/components/loader"

// Theme && Utils
import { lcTheme } from "@/lib/utils"

// Clerk
import { useOrganization } from "@clerk/nextjs"
import { OrganizationMembershipResource } from "@clerk/types"
import { format } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export function ItemManagement() {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [editingItem, setEditingItem] = useState<Item | null>(null)
    const queryClient = useQueryClient()

    const organization = useOrganization()

    async function getOrganizationMemberships() {
        const memberships = await organization?.organization?.getMemberships()
        return memberships?.data || []  // Return empty array if undefined
    }

    const { data: memberships } = useQuery<OrganizationMembershipResource[], Error>({
        queryKey: ["memberships"],
        queryFn: getOrganizationMemberships,
        enabled: !!organization.organization
    })

    const { data: items, isLoading, isError } = useQuery<Item[], Error>({
        queryKey: ["items"],
        queryFn: fetchItems,
    })

    const { data: manufacturers } = useQuery<Manufacturer[], Error>({
        queryKey: ["manufacturers"],
        queryFn: fetchManufacturers,
    })

    const { data: statuses } = useQuery<Status[], Error>({
        queryKey: ["statuses"],
        queryFn: fetchStatuses,
    })

    const { data: suppliers } = useQuery<Supplier[], Error>({
        queryKey: ["suppliers"],
        queryFn: fetchSuppliers,
    })

    const { data: locations } = useQuery<Location[], Error>({
        queryKey: ["locations"],
        queryFn: fetchLocations,
    })

    const { data: categories } = useQuery<Category[], Error>({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    })

    const { data: models } = useQuery<Model[], Error>({
        queryKey: ["models"],
        queryFn: fetchModels,
    })

    const createMutation = useMutation<void, Error, z.infer<typeof ItemSchema>>({
        mutationFn: (item) => createItem({ ...item }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["items"] })
            toast.success("Item created successfully")
            setIsAddDialogOpen(false)
        },
        onError: (error: Error) => toast.error(error.message || "Failed to create item")
    })

    const updateMutation = useMutation<void, Error, Partial<Item> & { id: string }>({
        mutationFn: updateItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["items"] })
            toast.success("Item updated successfully")
            setEditingItem(null)
        },
        onError: (error: Error) => toast.error(error.message || "Failed to update item")
    })

    const deleteMutation = useMutation<void, Error, string>({
        mutationFn: deleteItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["items"] })
            toast.success("Item deleted successfully")
        },
        onError: (error: Error) => toast.error(error.message || "Failed to delete item")
    })

    const form = useForm<z.infer<typeof ItemSchema>>({
        resolver: zodResolver(ItemSchema),
        defaultValues: {
            name: "",
            statusId: "",
            currentUserId: "",
            locationId: "",
            purchaseCost: "",
            purchaseDate: "",
            supplierId: "",
            purchaseOrderId: "",
            serialNumber: "",
            modelId: "",
            image: "",
            byod: false,
            notes: "",
            available: false,
            manufacturerId: "",
            categoryId: "",
        },
    })

    const onSubmit = (values: z.infer<typeof ItemSchema>) => {
        if (editingItem) {
            updateMutation.mutate({ id: editingItem.id, ...values })
        } else {
            createMutation.mutate(values)
        }
    }

    const columnDefs = useMemo<ColDef[]>(() => [
        {
            field: "image",
            headerName: "Image",
            flex: 1,
            sortable: false,
            filter: false,
            maxWidth: 100,
            cellRenderer: (params: ICellRendererParams) =>
                params.data.image ? <ImageCellRenderer image={params.data.image} /> : null
        },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
        },
        {
            field: "serialNumber",
            headerName: "Serial Number",
            flex: 1,
            cellRenderer: (params: ICellRendererParams) => (
                <code>{params.data.serialNumber || 'N/A'}</code>
            ),
        },
        {
            field: "Model",
            headerName: "Model",
            flex: 1,
            cellRenderer: (params: ICellRendererParams) => (
                <p>{params.data.Model?.name || 'N/A'}</p>
            ),
        },
        {
            field: "manufacturer",
            headerName: "Manufacturer",
            flex: 1,
            cellRenderer: (params: ICellRendererParams) => (
                <p>{params.data.Manufacturer?.name || 'N/A'}</p>
            ),
        },
        {
            field: "category",
            headerName: "Category",
            flex: 1,
            cellRenderer: (params: ICellRendererParams) => (
                <p>{params.data.category?.name || 'N/A'}</p>
            ),
        },
        {
            headerName: "Status",
            flex: 1,
            cellRenderer: (params: ICellRendererParams) => (
                <p>{params.data.Status?.name || 'N/A'}</p>
            ),
        },
        {
            field: "Location",
            headerName: "Location",
            flex: 1,
            cellRenderer: (params: ICellRendererParams) => (
                <p>{params.data.Location?.name || 'N/A'}</p>
            ),
        },
        {
            field: "purchaseDate",
            headerName: "Purchase Date",
            flex: 1,
            cellRenderer: (params: ICellRendererParams) => (
                <p>{params.data.purchaseDate ? format(new Date(params.data.purchaseDate), "PPP") : 'N/A'}</p>
            ),
        },
        {
            field: "currentUserId",
            headerName: "Current User",
            flex: 1,
            cellRenderer: (params: ICellRendererParams) => (
                <div className="flex items-center space-x-2">
                    <Avatar className="size-8">
                        <AvatarImage src={memberships?.find(membership => membership.id === params.data.currentUserId)?.publicUserData?.imageUrl || ''} />
                        <AvatarFallback>{memberships?.find(membership => membership.id === params.data.currentUserId)?.publicUserData?.firstName || 'N/A'}</AvatarFallback>
                    </Avatar>
                    <p>{memberships?.find(memberships => memberships.id === params.data.currentUserId)?.publicUserData?.firstName || 'N/A'}</p>
                </div>
            ),
        },
        {
            field: "byod",
            headerName: "BYOD",
            flex: 1,
            maxWidth: 100,
            cellRenderer: (params: ICellRendererParams) => (
                <div className="flex items-center py-2">
                    <p>{params.data.byod ? <CheckCircle2 className="size-6" /> : <X className="size-6" />}</p>
                </div>
            ),
        },
        {
            headerName: "Actions",
            flex: 1,
            filter: false,
            sortable: false,
            maxWidth: 200,
            cellRenderer: (params: ICellRendererParams) => (
                <div className="flex items-center h-full space-x-2">
                    <Button variant="destructive" size="sm" onClick={() => deleteMutation.mutate(params.data.id)}>
                        <Trash2 className="h-4 w-4" />
                        Delete
                    </Button>
                    <Button variant="default" size="sm" onClick={() => setEditingItem(params.data)}>
                        <Pen className="h-4 w-4" />
                        Edit
                    </Button>
                </div>
            ),
        },
    ], [deleteMutation, memberships])

    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true
    }), [])

    if (isLoading) return <Loader />
    if (isError) return <div>Error loading item</div>

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Items</h2>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Add New Item
                </Button>
            </div>

            <div className="ag-theme-alpine h-[80vh] w-full">
                <AgGridReact
                    rowData={items}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    animateRows={true}
                    rowSelection="multiple"
                    pagination={true}
                    columnHoverHighlight={true}
                    paginationPageSize={20}
                    theme={lcTheme}
                />
            </div>

            <Dialog
                open={isAddDialogOpen || !!editingItem}
                onOpenChange={(open) => {
                    if (!open) {
                        setIsAddDialogOpen(false)
                        setEditingItem(null)
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingItem ? "Edit Item" : "Add New Item"}</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        <span className="text-md text-muted-foreground">Item is a representation of a product that is sold by the company.
                            It is used to group products that are similar in terms of features and specifications.</span>
                    </DialogDescription>
                    <ItemForm
                        form={form}
                        onSubmit={onSubmit}
                        editingItem={editingItem}
                        models={models || []}
                        suppliers={suppliers || []}
                        manufacturers={manufacturers || []}
                        categories={categories || []}
                        locations={locations || []}
                        statuses={statuses || []}
                        memberships={memberships || []}
                    />
                </DialogContent>
            </Dialog>
        </div>
    )
}
