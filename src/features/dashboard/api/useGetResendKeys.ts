import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api";


// This function is to get the current login user
export const useGetResendKeys = () => {
    const resendKeys = useQuery(api.resendKeys.getResendKeys);
    const isLoading = resendKeys === undefined;

    return { resendKeys, isLoading}
}