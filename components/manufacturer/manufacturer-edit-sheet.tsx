"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pen } from "lucide-react"

import type { Manufacturer } from '@prisma/client'
import { toast } from "@/hooks/use-toast"

interface ManufacturerEditSheetProps {
  manufacturer: Manufacturer;
  callback: () => void;
}

export default function ManufacturerEditSheet({ manufacturer, callback }: ManufacturerEditSheetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [editedmanufacturer, setManufacturer] = useState<Manufacturer>({
    id: '',
    name: '',
    image: '',
    siteUrl: '',
    supportUrl: '',
    supportPhone: '',
    supportEmail: '',
  })
  useEffect(() => {
    setManufacturer(manufacturer)
  }, [manufacturer])
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setManufacturer(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Updated manufacturer:", editedmanufacturer)
    try {
      fetch('/api/manufacturers', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...editedmanufacturer
        })
      })
        .then(res => {
          if (!res.ok) {
            throw new Error('Failed to update manufacturer');
          }
          return res.json();
        })
        .then(data => {
          callback()
          toast({
            title: 'Success',
            description: 'Manufacturer updated successfully',
            variant: 'default'
          });
        })
        .catch(error => {
          console.error('Error:', error);
          callback()
          toast({
            title: 'Error',
            description: 'Failed to update manufacturer',
            variant: 'destructive'
          });
        });
    } catch (error) {
      console.error(error)
      callback()
      toast({
        title: 'Error',
        description: 'Failed to update manufacturer',
        variant: 'destructive'
      })
      
    }
    setIsOpen(false)
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="default">
            <Pen />
          </Button>
        </SheetTrigger>
        <SheetContent className="sm:max-w-[425px]">
          <SheetHeader>
            <SheetTitle>Edit Manufacturer</SheetTitle>
            <SheetDescription>
              Make changes to the manufacturer here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={manufacturer.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                name="image"
                defaultValue={manufacturer.image || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteUrl">Site URL</Label>
              <Input
                id="siteUrl"
                name="siteUrl"
                defaultValue={manufacturer.siteUrl || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supportUrl">Support URL</Label>
              <Input
                id="supportUrl"
                name="supportUrl"
                defaultValue={manufacturer.supportUrl || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supportPhone">Support Phone</Label>
              <Input
                id="supportPhone"
                name="supportPhone"
                defaultValue={manufacturer.supportPhone || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input
                id="supportEmail"
                name="supportEmail"
                defaultValue={manufacturer.supportEmail}
                onChange={handleInputChange}
              />
            </div>
            <Button type="submit" className="w-full">Save changes</Button>
          </form>
        </SheetContent>
      </Sheet>
    </>
  )
}

