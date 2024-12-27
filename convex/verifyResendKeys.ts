"use node";

import { v } from "convex/values";
import { internalAction } from "./_generated/server";

export const verify = internalAction({
    args: {
        resendApiKey: v.string(),
    },
    handler: async (_, args) => {
        const res = await fetch("https://api.resend.com/domains", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${args.resendApiKey}`,
            },
        });

        return res.ok;
    }
})