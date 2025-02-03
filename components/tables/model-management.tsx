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
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from "@/components/ui/select"
import toast from "react-hot-toast"
import ImageCellRenderer from "@/components/image-cell-renderer"

// Schemas and types
import ModelSchema from '@/lib/schemas/ModelSchema';
import type { Category, Manufacturer, Model } from "@/lib/types"

// API functions
import { fetchModels, deleteModels, updateModels, createModels } from "@/lib/modelsApi"
import { fetchManufacturers } from "@/lib/manufacturersApi"
import { fetchCategories } from "@/lib/categoriesApi"

// Loader component
import Loader from "@/components/loader"

// Theme
import { lcTheme } from "@/lib/utils"
import { DialogDescription } from "@radix-ui/react-dialog"

export function ModelManagement() {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [editingModel, setEditingModel] = useState<Model | null>(null)
    const queryClient = useQueryClient()

    const { data: manufacturers } = useQuery<Manufacturer[], Error>({
        queryKey: ["manufacturers"],
        queryFn: fetchManufacturers,
    })

    const { data: categories } = useQuery<Category[], Error>({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    })

    const { data: models, isLoading, isError } = useQuery<Model[], Error>({
        queryKey: ["models"],
        queryFn: fetchModels,
    })

    const createMutation = useMutation<void, Error, z.infer<typeof ModelSchema>>({
        mutationFn: (model) => createModels({ ...model }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["models"] })
            toast.success("Model created successfully")
            setIsAddDialogOpen(false)
        },
        onError: (error: Error) => toast.error(error.message || "Failed to create model")
    })

    const updateMutation = useMutation<void, Error, Partial<Model> & { id: string }>({
        mutationFn: updateModels,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["models"] })
            toast.success("Model updated successfully")
            setEditingModel(null)
        },
        onError: (error: Error) => toast.error(error.message || "Failed to update model")
    })

    const deleteMutation = useMutation<void, Error, string>({
        mutationFn: deleteModels,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["models"] })
            toast.success("Model deleted successfully")
        },
        onError: (error: Error) => toast.error(error.message || "Failed to delete model")
    })

    const form = useForm<z.infer<typeof ModelSchema>>({
        resolver: zodResolver(ModelSchema),
        defaultValues: {
            name: "",
            image: "",
            modelNumber: "",
            manufacturerId: "",
            categoryId: "",
        },
    })

    const onSubmit = (values: z.infer<typeof ModelSchema>) => {
        if (editingModel) {
            updateMutation.mutate({ id: editingModel.id, ...values })
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
            cellRenderer: (params: ICellRendererParams) => <ImageCellRenderer image={params.data.image as string} />
        },
        {
            field: "name",

            headerName: "Name",
            flex: 1,
        },


        {
            field: "modelNumber",
            headerName: "Model Number",
            flex: 1,
            cellRenderer: (params: ICellRendererParams) => (
                <pre>{params.data.modelNumber}</pre>
            ),
        },
        {
            field: "Manufacturer",
            flex: 1,
            cellRenderer: (params: ICellRendererParams) => (
                <p>{params.data.Manufacturer.name}</p>
            ),
        },
        {
            field: "category",
            headerName: "Category",
            flex: 1,
            cellRenderer: (params: ICellRendererParams) => (
                <p>{params.data.category.name}</p>
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
                    <Button variant="default" size="sm" onClick={() => setEditingModel(params.data)}>
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
    if (isError) return <div>Error loading model</div>

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Product Models</h2>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Add New Model
                </Button>
            </div>

            <div className="ag-theme-alpine h-[80vh] w-full">
                <AgGridReact
                    rowData={models}
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
                open={isAddDialogOpen || !!editingModel}
                onOpenChange={(open) => {
                    if (!open) {
                        setIsAddDialogOpen(false)
                        setEditingModel(null)
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingModel ? "Edit Model" : "Add New Model"}</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        <span className="text-md text-muted-foreground">Model is a representation of a product that is sold by the company.
                            It is used to group products that are similar in terms of features and specifications.</span>
                    </DialogDescription>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                defaultValue={editingModel?.name}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Model Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter model name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="image"
                                defaultValue={editingModel?.image}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Image</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter image url" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="modelNumber"
                                defaultValue={editingModel?.modelNumber}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Model Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter model number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="manufacturerId"
                                defaultValue={editingModel?.manufacturerId}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Manufacturer</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select manufacturer" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {manufacturers?.map((manufacturer) => (
                                                        <SelectItem key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="categoryId"
                                defaultValue={editingModel?.categoryId}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {categories?.map((category) => (
                                                        <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">{editingModel ? "Update" : "Add"} Model</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
