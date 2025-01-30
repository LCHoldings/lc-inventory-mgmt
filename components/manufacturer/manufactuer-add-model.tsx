"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog"
import { ManufacturerAddForm } from "./manufacturer-add-form"
import type { Manufacturer } from '@prisma/client' // Use drizzle types

export function ManufacturerAddModal() {
  const [isOpen, setIsOpen] = useState(false)

  const handleSave = (newManufacturer: Manufacturer) => {
    setIsOpen(false)
    fetch('/api/manufacturers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newManufacturer)
    }).then(() => {
    })
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add New Manufacturer</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>
          Add New Manufacturer
        </DialogTitle>
        <DialogDescription>
          Add a new manufacturer.
        </DialogDescription>
        <ManufacturerAddForm
          onSave={handleSave}
          onCancel={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}