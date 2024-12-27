import { useQuery } from "convex/react"
import { api } from "../../convex/_generated/api";

// This function is to get the current login user
export const useIsVerified = () => {
    const isVerified = useQuery(api.resendKeys.verified);
    const isLoading = isVerified === undefined;

    return { isVerified, isLoading}
}