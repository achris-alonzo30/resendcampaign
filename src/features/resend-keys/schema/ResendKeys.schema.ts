import { z } from "zod";

export const ResendKeysSchema = z.object({
    resendApiKey: z.string().min(12),
    resendDomain: z.string().min(2)
})