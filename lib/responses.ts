import { SignInPageErrorParam, APIResponseParam } from './types';

export const signinErrors: Record<SignInPageErrorParam | "default", string> = {
    default: "Unable to sign in. Please try again.",
    Signin: "Try signing in with a different account or contact your administrator.",
    OAuthSignin: "Try signing in with a different account or contact your administrator.",
    OAuthCallbackError: "Try signing in with a different account or contact your administrator.",
    OAuthCreateAccount: "Try signing in with a different account or contact your administrator.",
    EmailCreateAccount: "Try signing in with a different account or contact your administrator.",
    Callback: "Try signing in with a different account or contact your administrator.",
    OAuthAccountNotLinked:
        "An account with the same e-mail address already exists. Please verify your identity by signing in like normally or contact your administrator.",
    EmailSignin: "The e-mail could not be sent. Please try again or contact your administrator.",
    CredentialsSignin:
        "Sign in failed. Check the details you provided are correct.",
    SessionRequired: "Please sign in to access this page.",
    MissingCSRF: "An error occurred. Please refresh the page try again. If it persists, contact your administrator.",
    AccessDenied: "Your account is currently suspended. Please contact your administrator.",
}

export const APIResponses: Record<APIResponseParam | "default", string> = {
    default: "An error occurred. Please try again.",
    NotAuthenticated: "You are not authenticated",
    Forbidden: "You are not authorized to access this resource",
    FailedToFetch: "Failed to fetch",
    FailedToCreate: "Failed to create",
    FailedToUpdate: "Failed to update",
    FailedToDelete: "Failed to delete",
    InvalidAction: "Invalid action",
    NoParams: "No params specified",
}