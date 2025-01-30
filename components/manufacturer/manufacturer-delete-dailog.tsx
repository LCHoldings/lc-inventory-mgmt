"use client"

import { useState } from "react"
import { Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"

import { Manufacturer } from "@prisma/client"

interface DialogDeleteButtonProps {
    callback: () => void
    manufacturer: Manufacturer
}

export default function DialogDeleteButton({ manufacturer, callback }: DialogDeleteButtonProps) {
    const [open, setOpen] = useState(false)

    const handleDelete = () => {
        callback()
        setOpen(false)
        try {
            fetch('/api/manufacturers', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...manufacturer
                })
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Failed to delete manufacturer');
                    }
                    return res.json();
                })
                .then(data => {
                    callback()
                    toast({
                        title: 'Success',
                        description: 'Manufacturer delete successfully',
                        variant: 'default'
                    });
                })
                .catch(error => {
                    console.error('Error:', error);
                    callback()
                    toast({
                        title: 'Error',
                        description: 'Failed to delete manufacturer',
                        variant: 'destructive'
                    });
                });
        } catch (error) {
            console.error(error)
            callback()
            toast({
                title: 'Error',
                description: 'Failed to delete manufacturer',
                variant: 'destructive'
            })
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive" size="sm">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure you want to delete the {manufacturer.name} ?</DialogTitle>
                    <DialogDescription>
                        This action will permanently delete the {manufacturer.name}. This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDelete}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

