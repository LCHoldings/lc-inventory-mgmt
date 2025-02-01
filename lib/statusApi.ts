import type { Status, StatusApi } from "@/lib/types"

export async function fetchStatuses(): Promise<Status[]> {
    const response = await fetch("/api/statuses")
    if (!response.ok) throw new Error("Failed to fetch statuses")
    const data: StatusApi = await response.json()
    if (!data.success || !data.data) throw new Error(data.error ?? "Unknown error")
    return data.data
}

export async function createStatus(status: Omit<Status, "id" | "organizationId" | "items" | "devices">): Promise<void> {
    const response = await fetch("/api/statuses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(status),
    })
    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to create status")
    }
}

export async function updateStatus(status: Partial<Status> & { id: number }): Promise<void> {
    const response = await fetch(`/api/statuses?id=${status.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(status),
    })
    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to update status")
    }
}

export async function deleteStatus(id: number): Promise<void> {
    const response = await fetch(`/api/statuses?id=${id}`, {
        method: "DELETE",
    })
    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to delete status")
    }
}

