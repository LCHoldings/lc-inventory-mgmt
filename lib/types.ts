export interface Category {
    id: number
    name: string
    type: string
    models: Model[]
    items: Item[]
    devices: Device[]
}
export interface Supplier {
    id: number
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
    name: string
    image: string
    modelNumber: string
    manufacturerId: number
    categoryId: number
    Manufacturer: Manufacturer
    category: Category
    items: Item[]
    devices: Device[]
}
export interface Item {
    id: number
    name: string
    modelId: number
    statusId: number
    Model: Model
    Status: Status
}
export interface Device {
    id: number
    name: string
    modelId: number
    statusId: number
    Model: Model
    Status: Status
}
export interface Status {
    id: number
    name: string
    color: string
    default: boolean
    items: Item[]
    devices: Device[]
}	

export interface CategoryApi {
    error: string | null
    succes: boolean
    data: Category[] | null

}