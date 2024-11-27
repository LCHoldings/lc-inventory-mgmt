import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    FormLabel
} from "@/components/ui/form"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { toast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { default } from '../auth.config';

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

export function EditStatusCard({ status, setCardOpen }: { status: Status, setCardOpen: (open: boolean) => void }) {
    const [name, setName] = useState("")
    const [color, setColor] = useState("")
    const [isDefault, setIsDefault] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: status.name,
            color: status.color,
            default: status.default,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await fetch('/api/statuses', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...values, statusid: status.statusid }),
            })
            if (!response.ok) {
                const getError = await response.text()
                throw new Error(JSON.parse(getError).error)
            }
            form.reset()
            setCardOpen(false)
            toast({
                title: "Success",
                description: "Status updated successfully",
            })
        } catch (error) {
            toast({
                title: "Error",
                description: String(error) || "Failed to update status",
                variant: "destructive",
            })
        }
    }

    return (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle>Edit Status {status.statusid}</CardTitle>
                    <CardDescription>Change color, default and name.</CardDescription>
                </CardHeader>
                <CardContent>
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
                            <CardFooter className="flex justify-between p-0">
                                <Button type="submit">Save</Button>
                                <Button variant="outline" type="button" onClick={() => setCardOpen(false)}>Cancel</Button>
                            </CardFooter>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}