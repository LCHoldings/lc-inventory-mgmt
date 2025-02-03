import type { Item, ItemApi } from "@/lib/types"

export async function fetchItems(): Promise<Item[]> {
    const response = await fetch("/api/items")
    if (!response.ok) throw new Error("Failed to fetch items")
    const data: ItemApi = await response.json()
    if (!data.success || !data.data) throw new Error(data.error ?? "Unknown error")
    return data.data
}

export async function createItem(item: Omit<Item, "id" | "organizationId" | "Status" | "Location" | "Supplier" | "Model" | "Manufacturer" | "category">): Promise<void> {
    const response = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
    })
    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to create item")
    }
}

export async function updateItem(item: Partial<Item> & { id: string }): Promise<void> {
    const response = await fetch(`/api/items?id=${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
    })
    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to update item")
    }
}

export async function deleteItem(id: string): Promise<void> {
    const response = await fetch(`/api/items?id=${id}`, {
        method: "DELETE",
    })
    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to delete item")
    }
}

