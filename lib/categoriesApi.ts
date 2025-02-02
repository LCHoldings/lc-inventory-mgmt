import type { Category, CategoryApi } from "@/lib/types"

export async function fetchCategories(): Promise<Category[]> {
    const response = await fetch("/api/categories")
    if (!response.ok) throw new Error("Failed to fetch categories")
    const data: CategoryApi = await response.json()
    if (!data.success || !data.data) throw new Error(data.error ?? "Unknown error")
    return data.data
}

export async function createCategory(category: Omit<Category, "id" | "organizationId" | "devices" | "items" | "models">): Promise<void> {
    const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
    })
    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to create category")
    }
}

export async function updateCategory(category: Partial<Category> & { id: number }): Promise<void> {
    const response = await fetch(`/api/categories?id=${category.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
    })
    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to update category")
    }
}

export async function deleteCategory(id: number): Promise<void> {
    const response = await fetch(`/api/categories?id=${id}`, {
        method: "DELETE",
    })
    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to delete category")
    }
}

