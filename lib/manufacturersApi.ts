import type { Manufacturer, ManufacturerApi } from "@/lib/types"

export async function fetchManufacturers(): Promise<Manufacturer[]> {
    const response = await fetch("/api/manufacturers")
    if (!response.ok) throw new Error("Failed to fetch statuses")
    const data: ManufacturerApi = await response.json()
    if (!data.success || !data.data) throw new Error(data.error ?? "Unknown error")
    return data.data
}

export async function createManufacturer(manufacturer: Omit<Manufacturer, "id" | "organizationId" | "devices" | "items" | "models">): Promise<void> {
    const response = await fetch("/api/manufacturers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(manufacturer),
    })
    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to create status")
    }
}

export async function updateManufacturer(manufacturer: Partial<Manufacturer> & { id: string }): Promise<void> {
    const response = await fetch(`/api/manufacturers?id=${manufacturer.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(manufacturer),
    })
    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to update status")
    }
}

export async function deleteManufacturer(id: string): Promise<void> {
    const response = await fetch(`/api/manufacturers?id=${id}`, {
        method: "DELETE",
    })
    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to delete status")
    }
}

