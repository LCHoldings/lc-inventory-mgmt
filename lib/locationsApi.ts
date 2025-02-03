import type { Location, LocationApi } from "@/lib/types"

export async function fetchLocations(): Promise<Location[]> {
    const response = await fetch("/api/locations")
    if (!response.ok) throw new Error("Failed to fetch locations")
    const data: LocationApi = await response.json()
    if (!data.success || !data.data) throw new Error(data.error ?? "Unknown error")
    return data.data
}

export async function createLocations(location: Omit<Location, "id" | "organizationId" | "devices" | "items">): Promise<void> {
    const response = await fetch("/api/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(location),
    })
    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to create location")
    }
}

export async function updateLocations(location: Partial<Location> & { id: string }): Promise<void> {
    const response = await fetch(`/api/locations?id=${location.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(location),
    })
    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to update location")
    }
}

export async function deleteLocations(id: string): Promise<void> {
    const response = await fetch(`/api/locations?id=${id}`, {
        method: "DELETE",
    })
    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to delete location")
    }
}

