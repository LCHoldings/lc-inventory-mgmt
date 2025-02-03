import type { Model, ModelApi } from "@/lib/types"

export async function fetchModels(): Promise<Model[]> {
    const response = await fetch("/api/models")
    if (!response.ok) throw new Error("Failed to fetch models")
    const data: ModelApi = await response.json()
    if (!data.success || !data.data) throw new Error(data.error ?? "Unknown error")
    return data.data
}

export async function createModels(model: Omit<Model, "id" | "organizationId" | "devices" | "items" | "Manufacturer" | "category">): Promise<void> {
    const response = await fetch("/api/models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(model),
    })
    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to create model")
    }
}

export async function updateModels(model: Partial<Model> & { id: string }): Promise<void> {
    const response = await fetch(`/api/models?id=${model.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(model),
    })
    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to update model")
    }
}

export async function deleteModels(id: string): Promise<void> {
    const response = await fetch(`/api/models?id=${id}`, {
        method: "DELETE",
    })
    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to delete model")
    }
}

