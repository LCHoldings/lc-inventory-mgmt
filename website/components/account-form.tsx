"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

const accountFormSchema = z.object({
    username: z.string().min(3).max(30),
    email: z.string().email(),
    phone_number: z.string().max(20).optional().nullable(),
    name: z.string().min(1).max(50),
    job_title: z.string().max(100).optional().nullable(),
    employee_id: z.string().max(50).optional().nullable(),
    notes: z.string().max(500).optional().nullable(),
    image: z.string().url().optional().nullable(),
})

type AccountFormValues = z.infer<typeof accountFormSchema>

interface User {
    id: string;
    username: string;
    email: string;
    phone_number?: string;
    name?: string;
    job_title?: string;
    employee_id?: string;
    account_type: string;
    suspended: boolean;
    notes?: string;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
}

export default function AccountForm({ user }: { user: User }) {
    const router = useRouter()
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<AccountFormValues>({
        resolver: zodResolver(accountFormSchema),
        defaultValues: {
            username: user.username,
            email: user.email,
            phone_number: user.phone_number || "",
            name: user.name,
            job_title: user.job_title || "",
            employee_id: user.employee_id || "",
            notes: user.notes || "",
            image: user.image || "",
        },
    })

    async function onSubmit(data: AccountFormValues) {
        setIsLoading(true)

        try {
            const response = await fetch("/api/user", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error("Failed to update account")
            }

            toast({
                title: "Success",
                description: "Your account has been updated.",
            })

            router.refresh()
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong. Your account was not updated. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Your username" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Your email" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the email address you use to sign in.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone_number"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input placeholder="+1 (555) 123-4567" {...field} value={field.value ?? ""} />
                            </FormControl>
                            <FormDescription>
                                Your phone number for account recovery or two-factor authentication.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="job_title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Job Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Your job title" {...field} value={field.value ?? ""} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="employee_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Employee ID</FormLabel>
                            <FormControl>
                                <Input placeholder="Your employee ID" {...field} value={field.value ?? ""} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Notes</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Any additional notes"
                                    className="resize-none"
                                    {...field}
                                    value={field.value ?? ""}
                                />
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
                            <FormLabel>Profile Image URL</FormLabel>
                            <FormControl>
                                <Input placeholder="https://example.com/avatar.jpg" {...field} value={field.value ?? ""} />
                            </FormControl>
                            <FormDescription>
                                Provide a URL for your profile picture.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Updating..." : "Update account"}
                </Button>
            </form>
        </Form>
    )
}

