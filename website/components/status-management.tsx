'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Pen, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { toast } from '@/hooks/use-toast'
import { EditStatusCard } from './edit-status-card'

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Status name must be at least 2 characters.",
    }),
    color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
        message: "Invalid color format. Use hex color (e.g., #FF0000).",
    }),
    default: z.boolean().default(false),
})

type Status = {
    id: string
    statusid: string
    name: string
    color: string
    default: boolean
}

export function StatusManagement() {
    const [statuses, setStatuses] = useState<Status[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [cardOpen, setCardOpen] = useState(false)
    const [cardStatus, setCardStatus] = useState<Status>()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            color: "#000000",
            default: false,
        },
    })

    useEffect(() => {
        fetchStatuses()
    }, [])

    useEffect(() => {
        if (!cardOpen) {
            fetchStatuses()
        }
    }, [cardOpen])

    function openCard(status: Status) {
        setCardOpen(true)
        setCardStatus(status)
    }

    async function fetchStatuses() {
        setIsLoading(true)
        try {
            const response = await fetch('/api/statuses')
            if (!response.ok) throw new Error('Failed to fetch statuses')
            const data = await response.json()
            setStatuses(data)
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch statuses",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await fetch('/api/statuses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            })
            if (!response.ok) {
                const getError = await response.text()
                throw new Error(JSON.parse(getError).error)
            }
            await fetchStatuses()
            form.reset()
            toast({
                title: "Success",
                description: "Status created successfully",
            })
        } catch (error) {
            toast({
                title: "Error",
                description: String(error) || "Failed to create status",
                variant: "destructive", 
            })
        }
    }

    async function deleteStatus(statusid: string) {
        try {
            const response = await fetch('/api/statuses', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ statusid }),
            })
            if (!response.ok) throw new Error('Failed to delete status')
            await fetchStatuses()
            toast({
                title: "Success",
                description: "Status deleted successfully",
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete status",
                variant: "destructive",
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
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        Set as Default
                                    </FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Add Status</Button>
                </form>
            </Form>
            {isLoading ? (
                <div>Loading statuses...</div>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Color</TableHead>
                            <TableHead>Default</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {statuses.map((status) => (
                            <TableRow key={status.statusid}>
                                <TableCell>{status.name}</TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        <div
                                            className="w-6 h-6 rounded-full"
                                            style={{ backgroundColor: status.color }}
                                        />
                                        <span>{status.color}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{status.default ? 'Yes' : 'No'}</TableCell>
                                <TableCell className="flex flex-row gap-2" >
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => deleteStatus(status.statusid)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        <span className="sr-only">Delete status</span>
                                    </Button>
                                    <Button
                                        variant="default"
                                        size="icon"
                                        onClick={() => openCard(status)}
                                    >
                                        <Pen className="h-4 w-4" />
                                        <span className="sr-only">Edit status</span>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
            {cardOpen && cardStatus && (
                <EditStatusCard status={cardStatus} setCardOpen={setCardOpen} />
            )}
        </div>
    )
}

