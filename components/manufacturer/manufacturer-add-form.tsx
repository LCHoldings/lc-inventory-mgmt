import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import type { Manufacturer } from '@prisma/client' // Use drizzle types
interface ManufacturerAddFormProps {
  onSave: (manufacturer: Manufacturer) => void
  onCancel: () => void
}

export function ManufacturerAddForm({ onSave, onCancel }: ManufacturerAddFormProps) {
  const [newManufacturer, setNewManufacturer] = useState<Manufacturer>({
    id: '',
    name: '',
    image: '',
    siteUrl: '',
    supportUrl: '',
    supportPhone: '',
    supportEmail: '',
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewManufacturer(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(newManufacturer)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={newManufacturer.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            name="image"
            value={newManufacturer.image || ''}
            onChange={handleInputChange}

          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="siteUrl">Site URL</Label>
          <Input
            id="siteUrl"
            name="siteUrl"
            value={newManufacturer.siteUrl || ''}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="supportUrl">Support URL</Label>
          <Input
            id="supportUrl"
            name="supportUrl"
            value={newManufacturer.supportUrl || ''}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="supportPhone">Support Phone</Label>
          <Input
            id="supportPhone"
            name="supportPhone"
            value={newManufacturer.supportPhone || ''}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="supportEmail">Support Email</Label>
          <Input
            id="supportEmail"
            name="supportEmail"
            value={newManufacturer.supportEmail}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className="flex flex-row justify-between pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Add Manufacturer</Button>
      </div>
    </form>
  )
}

