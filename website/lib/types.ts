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