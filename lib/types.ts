export interface Category {
    id: number
    name: string
    type: string
}

export type SignInPageErrorParam =
    | "Signin"
    | "OAuthSignin"
    | "OAuthCallbackError"
    | "OAuthCreateAccount"
    | "EmailCreateAccount"
    | "Callback"
    | "OAuthAccountNotLinked"
    | "EmailSignin"
    | "CredentialsSignin"
    | "SessionRequired"
    | "MissingCSRF"
    | "AccessDenied"

export type APIResponseParam =
    | "NotAuthenticated"
    | "Forbidden"
    | "FailedToFetch"
    | "FailedToCreate"
    | "FailedToUpdate"
    | "FailedToDelete"
    | "InvalidAction"
    | "NoParams"

export type Devices = {
     id: string,
     name: string,
     statusId: string,
     currentUserId: string,
     locationId: string,
     purchaseCost: string,
     purchaseDate: string,
     supplierId: string,
     purchaseOrderId: string,
     serialNumber: string,
     modelId: string,
     image: string,
     byod: boolean,
     notes: string,
     available: boolean,
     manufacturerId: string,
     categoryId: string,
}