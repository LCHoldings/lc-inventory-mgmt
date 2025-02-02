export interface Category {
    id: number
    organizationId: string
    name: string
    type: string
    models: Model[]
    items: Item[]
    devices: Device[]
}
export interface Supplier {
    id: number
    name: string
    organizationId: string
    website: string
    phoneNumber: string
    contactPerson: string
    postAdress: string
    emailAdress: string
    items: Item[]
    devices: Device[]
}
export interface Manufacturer {
    id: number
    organizationId: string
    siteUrl: string
    supportUrl: string
    supportPhone: string
    supportEmail: string
    name: string
    image: string
    models: Model[]
    devices: Device[]
    items: Item[]
}
export interface Model {
    id: number
    organizationId: string
    name: string
    image: string
    modelNumber: string
    manufacturerId: string
    categoryId: string
    Manufacturer: Manufacturer
    category: Category
    items: Item[]
    devices: Device[]
}
export interface Item {
    id: number
    organizationId: string
    name: string
    modelId: number
    statusId: number
    Model: Model
    Status: Status
}
export interface Device {
    id: number
    organizationId: string
    name: string
    modelId: number
    statusId: number
    Model: Model
    Status: Status
}
export interface Status {
    id: number
    organizationId: string
    name: string
    color: string
    default: boolean
    items: Item[]
    devices: Device[]
}

export interface CategoryApi {
    error: string | null
    success: boolean
    data: Category[] | null

}
export interface SupplierApi {
    error: string | null
    success: boolean
    data: Supplier[] | null
}
export interface ManufacturerApi {
    error: string | null
    success: boolean
    data: Manufacturer[] | null
}
export interface ModelApi {
    error: string | null
    success: boolean
    data: Model[] | null
}
export interface ItemApi {
    error: string | null
    success: boolean
    data: Item[] | null
}
export interface DeviceApi {
    error: string | null
    success: boolean
    data: Device[] | null
}
export interface StatusApi {
    error: string | null
    success: boolean
    data: Status[] | null
}
