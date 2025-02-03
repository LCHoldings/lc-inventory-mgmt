import type { Device, DeviceApi } from "@/lib/types"

export async function fetchDevices(): Promise<Device[]> {
    const response = await fetch("/api/devices")
    if (!response.ok) throw new Error("Failed to fetch devices")
    const data: DeviceApi = await response.json()
    if (!data.success || !data.data) throw new Error(data.error ?? "Unknown error")
    return data.data
}

export async function createDevice(device: Omit<Device, "id" | "organizationId" | "Status" | "Location" | "Supplier" | "Model" | "Manufacturer" | "category">): Promise<void> {
    const response = await fetch("/api/devices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(device),
    })
    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to create device")
    }
}

export async function updateDevice(device: Partial<Device> & { id: string }): Promise<void> {
    const response = await fetch(`/api/devices?id=${device.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(device),
    })
    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to update device")
    }
}

export async function deleteDevice(id: string): Promise<void> {
    const response = await fetch(`/api/devices?id=${id}`, {
        method: "DELETE",
    })
    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to delete device")
    }
}

