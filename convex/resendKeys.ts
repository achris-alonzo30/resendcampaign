import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const addResendKeys = mutation({
    args: {
        resendApiKey: v.string(),
        resendDomain: v.string(),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);
        if (userId === null) throw new Error("Unauthorized");

        await ctx.db.insert("resendKeys", {
            userId,
            resendApiKey: args.resendApiKey,
            resendDomain: args.resendDomain,
        })
    }
})