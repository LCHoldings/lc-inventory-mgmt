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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import toast from "react-hot-toast"

// Schemas and types
import CategorySchema from '@/lib/schemas/CategorySchema';
import type { Category } from "@/lib/types"

// API functions
import { createCategory, fetchCategories, updateCategory, deleteCategory } from "@/lib/categoriesApi"

// Loader component
import Loader from "@/components/loader"

// Theme
import { lcTheme } from "@/lib/utils"
import { Select } from "./ui/select"

export function CategoryManagement() {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [editingCategory, setEditingCategory] = useState<Category | null>(null)
    const queryClient = useQueryClient()

    const { data: categories, isLoading, isError } = useQuery<Category[], Error>({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    })

    const createMutation = useMutation<void, Error, z.infer<typeof CategorySchema>>({
        mutationFn: (category) => createCategory({ ...category }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] })
            toast.success("Category created successfully")
            setIsAddDialogOpen(false)
        },
        onError: (error: Error) => toast.error(error.message || "Failed to create Category")
    })

    const updateMutation = useMutation<void, Error, Partial<Category> & { id: number }>({
        mutationFn: updateCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] })
            toast.success("Category updated successfully")
            setEditingCategory(null)
        },
        onError: (error: Error) => toast.error(error.message || "Failed to update Category")
    })

    const deleteMutation = useMutation<void, Error, number>({
        mutationFn: deleteCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] })
            toast.success("Category deleted successfully")
        },
        onError: (error: Error) => toast.error(error.message || "Failed to delete Category")
    })

    const form = useForm<z.infer<typeof CategorySchema>>({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            type: "device",
            name: "",
        },
    })

    const onSubmit = (values: z.infer<typeof CategorySchema>) => {
        if (editingCategory) {
            updateMutation.mutate({ id: editingCategory.id, ...values })
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
            field: "type",
            headerName: "Type",
            flex: 1,
            cellRenderer: (params: ICellRendererParams) => (
                params.data.type === "device" ? "Device" : "Item"
            )
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
                    <Button variant="default" size="sm" onClick={() => setEditingCategory(params.data)}>
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
                <h2 className="text-3xl font-bold">Categories</h2>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Add New Status
                </Button>
            </div>

            <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
                <AgGridReact
                    rowData={categories}
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
                open={isAddDialogOpen || !!editingCategory}
                onOpenChange={(open) => {
                    if (!open) {
                        setIsAddDialogOpen(false)
                        setEditingCategory(null)
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingCategory ? "Edit Category" : "Add New Category"}</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                defaultValue={editingCategory?.name}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter category name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Type</FormLabel>
                                        <FormControl>
                                            <Select {...field}>
                                                <option value="device">Device</option>
                                                <option value="item">Item</option>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">{editingCategory ? "Update" : "Add"} Category</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
