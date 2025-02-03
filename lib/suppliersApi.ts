import type { Supplier, SupplierApi } from "@/lib/types"

export async function fetchSuppliers(): Promise<Supplier[]> {
    const response = await fetch("/api/suppliers")
    if (!response.ok) throw new Error("Failed to fetch suppliers")
    const data: SupplierApi = await response.json()
    if (!data.success || !data.data) throw new Error(data.error ?? "Unknown error")
    return data.data
}

export async function createSupplier(supplier: Omit<Supplier, "id" | "organizationId" | "devices" | "items">): Promise<void> {
    const response = await fetch("/api/suppliers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(supplier),
    })
    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to create supplier")
    }
}

export async function updateSupplier(supplier: Partial<Supplier> & { id: string }): Promise<void> {
    const response = await fetch(`/api/suppliers?id=${supplier.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(supplier),
    })
    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to update supplier")
    }
}

export async function deleteSupplier(id: string): Promise<void> {
    const response = await fetch(`/api/suppliers?id=${id}`, {
        method: "DELETE",
    })
    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to delete supplier")
    }
}

