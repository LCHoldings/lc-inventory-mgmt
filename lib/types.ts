export type DashHeaderProps = {
    title: string
    breadcrumbs?: Breadcrumb[]
}

export type Breadcrumb = {
    label: string
    href: string
}

export interface Category {
    id: string
    organizationId: string
    name: string
    type: string
    models: Model[]
    items: Item[]
    devices: Device[]
}
export interface Supplier {
    id: string
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
    id: string
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
    id: string
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
    id: string
    organizationId: string
    name: string
    statusId: string
    currentUserId: string
    locationId: string
    purchaseCost: string
    purchaseDate: string
    supplierId: string
    purchaseOrderId: string
    serialNumber: string
    modelId: string
    image: string
    byod: boolean
    notes: string
    available: boolean
    manufacturerId: string
    categoryId: string
    Status: Status
    Location: Location
    Supplier: Supplier
    Model: Model
    Manufacturer: Manufacturer
    category: Category
}
export interface Device {
    id: string
    organizationId: string
    name: string
    statusId: string
    currentUserId: string
    locationId: string
    purchaseCost: string
    purchaseDate: string
    supplierId: string
    purchaseOrderId: string
    serialNumber: string
    modelId: string
    image: string
    byod: boolean
    notes: string
    available: boolean
    manufacturerId: string
    categoryId: string

    Status: Status
    Location: Location
    Supplier: Supplier
    Model: Model
    Manufacturer: Manufacturer
    category: Category
}
export interface Status {
    id: string
    organizationId: string
    name: string
    color: string
    default: boolean
    items: Item[]
    devices: Device[]
}
export interface Location
{
    id: string
    organizationId: string
    name: string
    items: Item[]
    devices: Device[]
}
export interface LocationApi {
    error: string | null
    success: boolean
    data: Location[] | null
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
