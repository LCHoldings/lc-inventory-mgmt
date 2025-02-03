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
import LocationSchema from '@/lib/schemas/LocationSchema';
import type { Location } from "@/lib/types"

// API functions
import { fetchLocations, deleteLocations, updateLocations, createLocations } from "@/lib/locationsApi"

// Loader component
import Loader from "@/components/loader"

// Theme
import { lcTheme } from "@/lib/utils"

export function LocationManagement() {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [editingLocation, setEditingLocation] = useState<Location | null>(null)
    const queryClient = useQueryClient()

    const { data: locations, isLoading, isError } = useQuery<Location[], Error>({
        queryKey: ["locations"],
        queryFn: fetchLocations,
    })

    const createMutation = useMutation<void, Error, z.infer<typeof LocationSchema>>({
        mutationFn: (location) => createLocations({ ...location }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["locations"] })
            toast.success("Location created successfully")
            setIsAddDialogOpen(false)
        },
        onError: (error: Error) => toast.error(error.message || "Failed to create location")
    })

    const updateMutation = useMutation<void, Error, Partial<Location> & { id: string }>({
        mutationFn: updateLocations,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["locations"] })
            toast.success("Location updated successfully")
            setEditingLocation(null)
        },
        onError: (error: Error) => toast.error(error.message || "Failed to update location")
    })

    const deleteMutation = useMutation<void, Error, string>({
        mutationFn: deleteLocations,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["locations"] })
            toast.success("Location deleted successfully")
        },
        onError: (error: Error) => toast.error(error.message || "Failed to delete location")
    })

    const form = useForm<z.infer<typeof LocationSchema>>({
        resolver: zodResolver(LocationSchema),
        defaultValues: {
            name: "",
        },
    })

    const onSubmit = (values: z.infer<typeof LocationSchema>) => {
        if (editingLocation) {
            updateMutation.mutate({ id: editingLocation.id, ...values })
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
                    <Button variant="default" size="sm" onClick={() => setEditingLocation(params.data)}>
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
    if (isError) return <div>Error loading locations</div>

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Locations</h2>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Add New Location
                </Button>
            </div>

            <div className="ag-theme-alpine h-[80vh] w-full">
                <AgGridReact
                    rowData={locations}
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
                open={isAddDialogOpen || !!editingLocation}
                onOpenChange={(open) => {
                    if (!open) {
                        setIsAddDialogOpen(false)
                        setEditingLocation(null)
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingLocation ? "Edit Location" : "Add New Location"}</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        <span className="text-md text-muted-foreground">Location is a physical location where devices and items are stored.</span>
                    </DialogDescription>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                defaultValue={editingLocation?.name}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Location Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter location name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">{editingLocation ? "Update" : "Add"} Location</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
