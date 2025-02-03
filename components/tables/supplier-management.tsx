"use client"

// React and hooks
import { useState, useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type * as z from "zod"

// Icons
import { Pen, Trash2, Plus } from "lucide-react"

// AG Grid
import { AgGridReact } from "ag-grid-react"
import { type ColDef, type ICellRendererParams } from "ag-grid-community"

// React Query
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

// UI components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import toast from "react-hot-toast"

// Schemas and types
import SupplierSchema from '@/lib/schemas/SupplierSchema';
import type { Supplier } from "@/lib/types"

// API functions
import { createSupplier, deleteSupplier, updateSupplier, fetchSuppliers } from "@/lib/suppliersApi"

// Loader component
import Loader from "@/components/loader"

// Theme
import { lcTheme } from "@/lib/utils"

export function SupplierManagement() {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null)
    const queryClient = useQueryClient()

    const { data: suppliers, isLoading, isError } = useQuery<Supplier[], Error>({
        queryKey: ["suppliers"],
        queryFn: fetchSuppliers,
    })

    const createMutation = useMutation<void, Error, z.infer<typeof SupplierSchema>>({
        mutationFn: (supplier) => createSupplier({ ...supplier }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["suppliers"] })
            toast.success("Supplier created successfully")
            setIsAddDialogOpen(false)
        },
        onError: (error: Error) => toast.error(error.message || "Failed to create supplier")
    })

    const updateMutation = useMutation<void, Error, Partial<Supplier> & { id: string }>({
        mutationFn: updateSupplier,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["suppliers"] })
            toast.success("Supplier updated successfully")
            setEditingSupplier(null)
        },
        onError: (error: Error) => toast.error(error.message || "Failed to update supplier")
    })

    const deleteMutation = useMutation<void, Error, string>({
        mutationFn: deleteSupplier,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["suppliers"] })
            toast.success("Supplier deleted successfully")
        },
        onError: (error: Error) => toast.error(error.message || "Failed to delete supplier")
    })

    const form = useForm<z.infer<typeof SupplierSchema>>({
        resolver: zodResolver(SupplierSchema),
        defaultValues: {
            name: "",
        },
    })

    const onSubmit = (values: z.infer<typeof SupplierSchema>) => {
        if (editingSupplier) {
            updateMutation.mutate({ id: editingSupplier.id, ...values })
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
            field: "website",
            headerName: "Website",
            flex: 1,
        },
        {
            field: "phoneNumber",
            headerName: "Phone Number",
            flex: 1,
        },
        {
            field: "contactPerson",
            headerName: "Contact Person",
            flex: 1,
        },
        {
            field: "postAdress",
            headerName: "Post Address",
            flex: 1,
        },
        {
            field: "emailAdress",
            headerName: "Email Address",
            flex: 1,
        },
        {
            field: "items",
            headerName: "Items",
            flex: 1,
            maxWidth: 100,
            cellRenderer: (params: ICellRendererParams) => (
                params.data.devices.length
            )
        },
        {
            field: "devices",
            headerName: "Devices",
            flex: 1,
            maxWidth: 100,
            cellRenderer: (params: ICellRendererParams) => (
                params.data.devices.length
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
                    <Button variant="default" size="sm" onClick={() => setEditingSupplier(params.data)}>
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
    if (isError) return <div>Error loading suppliers</div>

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Locations</h2>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Add New Supplier
                </Button>
            </div>

            <div className="ag-theme-alpine h-[80vh] w-full">
                <AgGridReact
                    rowData={suppliers}
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
                open={isAddDialogOpen || !!editingSupplier}
                onOpenChange={(open) => {
                    if (!open) {
                        setIsAddDialogOpen(false)
                        setEditingSupplier(null)
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingSupplier ? "Edit Supplier" : "Add New Supplier"}</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        <span className="text-md text-muted-foreground">Supplier is a company that provides products and services to the organization.</span>
                    </DialogDescription>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                defaultValue={editingSupplier?.name}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Supplier Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter supplier name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="website"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Website</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter website" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter phone number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="contactPerson"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contact Person</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter contact person" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="emailAdress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter email address" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="postAdress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Post Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter post address" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">{editingSupplier ? "Update" : "Add"} Supplier</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
