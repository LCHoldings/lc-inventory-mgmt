// External dependencies
import type { OrganizationMembershipResource } from "@clerk/types"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import type { UseFormReturn } from "react-hook-form"
import type * as z from "zod"

// Internal types
import type ItemSchema from '@/lib/schemas/ItemSchema'
import type { Category, Item, Location, Manufacturer, Model, Status, Supplier } from "@/lib/types"

// Utils
import { cn } from "@/lib/utils"

// UI Components
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface ItemFormProps {
    form: UseFormReturn<z.infer<typeof ItemSchema>>
    onSubmit: (values: z.infer<typeof ItemSchema>) => void
    editingItem: Item | null
    models: Model[]
    suppliers: Supplier[]
    manufacturers: Manufacturer[]
    categories: Category[]
    locations: Location[]
    statuses: Status[]
    memberships: OrganizationMembershipResource[]
}

export default function ItemForm({
    form,
    onSubmit,
    editingItem,
    models,
    suppliers,
    manufacturers,
    categories,
    locations,
    statuses,
    memberships,
}: ItemFormProps) {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="basic-info">
                        <AccordionTrigger>Basic Item Information</AccordionTrigger>
                        <AccordionContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    defaultValue={editingItem?.name}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Item Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter item name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="serialNumber"
                                    defaultValue={editingItem?.serialNumber}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Serial Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter serial number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="image"
                                defaultValue={editingItem?.image}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Image</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter image URL" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="purchase-info">
                        <AccordionTrigger>Purchase Information</AccordionTrigger>
                        <AccordionContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                <FormField
                                    control={form.control}
                                    name="purchaseDate"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Purchase Date</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground",
                                                            )}
                                                        >
                                                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value ? new Date(field.value) : undefined}
                                                        onSelect={(date) => form.setValue("purchaseDate", date?.toISOString() || "")}
                                                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="purchaseCost"
                                    defaultValue={editingItem?.purchaseCost}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Purchase Cost</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter purchase cost" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="purchaseOrderId"
                                defaultValue={editingItem?.purchaseOrderId}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Purchase Order ID</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter purchase order ID" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="product-details">
                        <AccordionTrigger>Product Details</AccordionTrigger>
                        <AccordionContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                                <FormField
                                    control={form.control}
                                    name="modelId"
                                    defaultValue={editingItem?.modelId}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Model</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select model" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {models?.map((model) => (
                                                        <SelectItem key={model.id} value={model.id}>
                                                            {model.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="supplierId"
                                    defaultValue={editingItem?.supplierId}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Supplier</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select supplier" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {suppliers?.map((supplier) => (
                                                        <SelectItem key={supplier.id} value={supplier.id}>
                                                            {supplier.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="manufacturerId"
                                    defaultValue={editingItem?.manufacturerId}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Manufacturer</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select manufacturer" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {manufacturers?.map((manufacturer) => (
                                                        <SelectItem key={manufacturer.id} value={manufacturer.id}>
                                                            {manufacturer.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="classification">
                        <AccordionTrigger>Item Classification and Location</AccordionTrigger>
                        <AccordionContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                                <FormField
                                    control={form.control}
                                    name="categoryId"
                                    defaultValue={editingItem?.categoryId}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select category" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {categories?.map((category) => (
                                                        <SelectItem key={category.id} value={category.id}>
                                                            {category.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="locationId"
                                    defaultValue={editingItem?.locationId}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Location</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select location" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {locations?.map((location) => (
                                                        <SelectItem key={location.id} value={location.id}>
                                                            {location.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="statusId"
                                    defaultValue={editingItem?.statusId}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Status</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {statuses?.map((status) => (
                                                        <SelectItem key={status.id} value={status.id}>
                                                            {status.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="additional-info">
                        <AccordionTrigger>Additional Information</AccordionTrigger>
                        <AccordionContent>
                            <FormField
                                control={form.control}
                                name="notes"
                                defaultValue={editingItem?.notes}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Notes</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="The laptop requires a new battery..."
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="currentUserId"
                                defaultValue={editingItem?.currentUserId}
                                render={({ field }) => (
                                    <FormItem className="mt-4">
                                        <FormLabel>Current User</FormLabel>
                                        <div className="flex flex-row justify-center items-center gap-2">
                                            <Avatar>
                                                <AvatarImage src={memberships?.find(membership => membership.id === field.value)?.publicUserData?.imageUrl} />
                                                <AvatarFallback>{memberships?.find(membership => membership.id === field.value)?.publicUserData?.firstName?.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select user" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {memberships?.map((membership) => (
                                                        <SelectItem key={membership.id} value={membership.id}>
                                                            {membership.publicUserData?.firstName} {membership.publicUserData?.lastName}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="status-flags">
                        <AccordionTrigger>Item Status Flags</AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-wrap gap-6 mt-4">
                                <FormField
                                    control={form.control}
                                    name="byod"
                                    defaultValue={editingItem?.byod}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>BYOD</FormLabel>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="available"
                                    defaultValue={editingItem?.available}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>Available</FormLabel>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <Button type="submit" className="w-full mt-6">
                    {editingItem ? "Update" : "Add"} Item
                </Button>
            </form>
        </Form>
    )
}

