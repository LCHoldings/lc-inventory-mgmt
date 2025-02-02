"use client"

// React and hooks
import { useState, useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type * as z from "zod"

// Icons
import { Pen, Trash2, Plus, CircleCheck, CircleX } from "lucide-react"

// AG Grid
import { AgGridReact } from "ag-grid-react"
import { type ColDef, type ICellRendererParams } from "ag-grid-community"

// React Query
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

// UI components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import toast from "react-hot-toast"

// Schemas and types
import ManufacturerSchema from '@/lib/schemas/ManufacturerSchema';
import type { Manufacturer } from "@/lib/types"

// API functions
import { fetchManufacturers, deleteManufacturer, updateManufacturer, createManufacturer } from "@/lib/manufacturersApi"

// Loader component
import Loader from "@/components/loader"

// Theme
import { lcTheme } from "@/lib/utils"

export function ManufacturerManagement() {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [editingStatus, setEditingStatus] = useState<Manufacturer | null>(null)
    const queryClient = useQueryClient()

    const { data: manufacturers, isLoading, isError } = useQuery<Manufacturer[], Error>({
        queryKey: ["manufacturers"],
        queryFn: fetchManufacturers,
    })

    const createMutation = useMutation<void, Error, z.infer<typeof ManufacturerSchema>>({
        mutationFn: (manufacturer) => createManufacturer({ ...manufacturer }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["manufacturers"] })
            toast.success("Manufacturer created successfully")
            setIsAddDialogOpen(false)
        },
        onError: (error: Error) => toast.error(error.message || "Failed to create Manufacturer")
    })

    const updateMutation = useMutation<void, Error, Partial<Manufacturer> & { id: number }>({
        mutationFn: updateManufacturer,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["manufacturers"] })
            toast.success("Manufacturer updated successfully")
            setEditingStatus(null)
        },
        onError: (error: Error) => toast.error(error.message || "Failed to update Manufacturer")
    })

    const deleteMutation = useMutation<void, Error, number>({
        mutationFn: deleteManufacturer,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["manufacturers"] })
            toast.success("Manufacturer deleted successfully")
        },
        onError: (error: Error) => toast.error(error.message || "Failed to delete Manufacturer")
    })

    const form = useForm<z.infer<typeof ManufacturerSchema>>({
        resolver: zodResolver(ManufacturerSchema),
        defaultValues: {
            siteUrl: "",
            supportUrl: "",
            supportPhone: "",
            supportEmail: "",
            name: "",
            image: "",
        },
    })

    const onSubmit = (values: z.infer<typeof ManufacturerSchema>) => {
        if (editingStatus) {
            updateMutation.mutate({ id: editingStatus.id, ...values })
        } else {
            createMutation.mutate(values)
        }
    }

    const columnDefs = useMemo<ColDef[]>(() => [
        {
            field: "name",
            headerName: "Name",
            flex: 1,
        },
        {
            field: "supportUrl",
            headerName: "Support Page",
            flex: 1,
            sortable: false,
            cellRenderer: (params: ICellRendererParams) => (
                <a href={params.data.supportUrl} target="_blank" rel="noreferrer">{params.data.supportUrl}</a>
            ),
        },
        {
            field: "supportPhone",
            headerName: "Support Phone",
            flex: 1,
            sortable: false,
            cellRenderer: (params: ICellRendererParams) => (
                <a href={"tel:" + params.data.supportPhone} target="_blank" rel="noreferrer">{params.data.supportPhone}</a>
            ),
        },
        {
            field: "supportEmail",
            headerName: "Support Email",
            flex: 1,
            sortable: false,
            cellRenderer: (params: ICellRendererParams) => (
                <a href={"mailto:" + params.data.supportEmail} target="_blank" rel="noreferrer">{params.data.supportEmail}</a>
            ),
        },
        {
            headerName: "Items",
            flex: 1,
            maxWidth: 100,
            cellRenderer: (params: ICellRendererParams) => (
                params.data.devices.length
            )
        },
        {
            headerName: "Devices",
            flex: 1,
            maxWidth: 100,
            cellRenderer: (params: ICellRendererParams) => (
                params.data.devices.length
            )
        },
        {
            "headerName": "Models",
            "flex": 1,
            maxWidth: 100,
            "cellRenderer": (params: ICellRendererParams) => (
                params.data.models.length
            )
        },
        {
            headerName: "Actions",
            flex: 1,
            filter: false,
            sortable: false,
            cellRenderer: (params: ICellRendererParams) => (
                <div className="flex items-center h-full space-x-2">
                    <Button variant="destructive" size="sm" onClick={() => deleteMutation.mutate(params.data.id)}>
                        <Trash2 className="h-4 w-4" />
                        Delete
                    </Button>
                    <Button variant="default" size="sm" onClick={() => setEditingStatus(params.data)}>
                        <Pen className="h-4 w-4" />
                        Edit
                    </Button>
                </div>
            ),
        },
    ], [deleteMutation])

    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true
    }), [])

    if (isLoading) return <Loader />
    if (isError) return <div>Error loading statuses</div>

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Manufacturers</h2>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Add New Status
                </Button>
            </div>

            <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
                <AgGridReact
                    rowData={manufacturers}
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
                open={isAddDialogOpen || !!editingStatus}
                onOpenChange={(open) => {
                    if (!open) {
                        setIsAddDialogOpen(false)
                        setEditingStatus(null)
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingStatus ? "Edit Status" : "Add New Status"}</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                defaultValue={editingStatus?.name}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Manufacturer Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter manufacturer name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="siteUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Site URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter site URL" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="supportUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Support URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter support URL" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="supportPhone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Support Phone</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter support phone" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="supportEmail"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Support Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter support email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Image URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter image URL" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">{editingStatus ? "Update" : "Add"} Manufacturer</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
