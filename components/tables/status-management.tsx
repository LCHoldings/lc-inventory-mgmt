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
import StatusSchema from "@/lib/schemas/StatusSchema"
import type { Status } from "@/lib/types"

// API functions
import { fetchStatuses, createStatus, deleteStatus, updateStatus } from "@/lib/statusApi"

// Loader component
import Loader from "@/components/loader"

// Theme
import { lcTheme } from "@/lib/utils"

export function StatusManagement() {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [editingStatus, setEditingStatus] = useState<Status | null>(null)
    const queryClient = useQueryClient()

    const { data: statuses, isLoading, isError } = useQuery<Status[], Error>({
        queryKey: ["statuses"],
        queryFn: fetchStatuses,
    })

    const createMutation = useMutation<void, Error, z.infer<typeof StatusSchema>>({
        mutationFn: (status) => createStatus({ ...status }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["statuses"] })
            toast.success("Status created successfully")
            setIsAddDialogOpen(false)
        },
        onError: (error: Error) => toast.error(error.message || "Failed to create status")
    })

    const updateMutation = useMutation<void, Error, Partial<Status> & { id: string }>({
        mutationFn: updateStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["statuses"] })
            toast.success("Status updated successfully")
            setEditingStatus(null)
        },
        onError: (error: Error) => toast.error(error.message || "Failed to update status")
    })

    const deleteMutation = useMutation<void, Error, string>({
        mutationFn: deleteStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["statuses"] })
            toast.success("Status deleted successfully")
        },
        onError: (error: Error) => toast.error(error.message || "Failed to delete status")
    })

    const form = useForm<z.infer<typeof StatusSchema>>({
        resolver: zodResolver(StatusSchema),
        defaultValues: {
            name: "",
            color: "#000000",
            default: false,
        },
    })

    const onSubmit = (values: z.infer<typeof StatusSchema>) => {
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
            field: "color",
            headerName: "Color",
            flex: 1,
            sortable: false,
            cellRenderer: (params: ICellRendererParams) => (
                <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: params.value }} />
                    <span>{params.value}</span>
                </div>
            ),
        },
        {
            field: "default",
            headerName: "Default",
            flex: 1,
            cellRenderer: (params: ICellRendererParams) => (
                <div className="flex items-center h-full">
                    {params.value ? <CircleCheck className="size-6 text-green-500" /> : <CircleX className="size-6 text-red-500" />}
                </div>
            ),
        },
        {
            headerName: "Devices",
            flex: 1,
            cellRenderer: (params: ICellRendererParams) => (
                params.data.devices.length
            )
        },
        {
            headerName: "Items",
            flex: 1,
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
                <h2 className="text-3xl font-bold">Status Management</h2>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Add New Status
                </Button>
            </div>

            <div className="ag-theme-alpine h-[80vh] w-full">
                <AgGridReact
                    rowData={statuses}
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
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter status name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="color"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Color</FormLabel>
                                        <FormControl>
                                            <div className="flex items-center space-x-2">
                                                <Input type="color" {...field} className="w-12 h-12 p-1 rounded-md" />
                                                <Input {...field} placeholder="#000000" className="flex-grow" />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="default"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>Set as Default</FormLabel>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">{editingStatus ? "Update" : "Add"} Status</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
