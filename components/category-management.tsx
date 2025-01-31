'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { toast } from '@/hooks/use-toast'
import formSchema from '@/lib/schemas/CategorySchema'
import { Category } from '@/lib/types'
import { json } from 'stream/consumers'

export function CategoryManagement() {
    const [categories, setCategories] = useState<Category[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            type: "device",
        },
    })

    useEffect(() => {
        fetchCategories()
    }, [])

    async function fetchCategories() {
        setIsLoading(true)
        try {
            const response = await fetch('/api/categories')
            if (!response.ok) throw new Error('Failed to fetch categories')
            const data = await response.json()
            console.log(data)

            setCategories(data.data)
        } catch (error) {
            console.error(error)
            toast({
                title: "Error",
                description: "Failed to fetch categories",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await fetch('/api/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: values.type, name: values.name }),
            })
            if (!response.ok) throw new Error('Failed to create category')
            await fetchCategories()
        } catch (error) {
            console.error(error)
            toast({
                title: "Error",
                description: "Failed to create category",
                variant: "destructive",
            })
        } finally {
            form.clearErrors()
            toast({
                title: "Sucess",
                description: "Category created successfully",
                variant: "default",
            })
        }
    }

    async function deleteCategory(categoryid: string) {
        try {
            const response = await fetch(`/api/categories?id=${categoryid}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            })
            if (!response.ok) throw new Error('Failed to delete category')
            await fetchCategories()
            toast({
                title: "Success",
                description: "Category deleted successfully",
            })
        } catch (error) {
            console.error(error)
            toast({
                title: "Error",
                description: "Failed to delete category",
                variant: "destructive",
            })
        } finally {
            toast({
                title: "Success",
                description: "Category deleted successfully",
                variant: "default",
            })
        }
    }

    return (
        <div className="space-y-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
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
                                <FormLabel>Category Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="device">Device</SelectItem>
                                        <SelectItem value="item">Item</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Add Category</Button>
                </form>
            </Form>

            {isLoading ? (
                <div>Loading categories...</div>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell>{category.name}</TableCell>
                                <TableCell><span className="capitalize">{category.type}</span></TableCell>
                                <TableCell>
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => deleteCategory(category.id.toString())}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        <span className="sr-only">Delete category</span>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    )
}

