import { v } from "convex/values";
import { internal } from "./_generated/api";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";


export const addResendKeys = mutation({
    args: {
        resendApiKey: v.string(),
        resendDomain: v.string(),
    },
    handler: async (ctx, {
        resendApiKey,
        resendDomain
    }) => {
        const userId = await getAuthUserId(ctx);

        if (userId === null) throw new Error("Unauthorized");

        const ok = await ctx.scheduler.runAfter(0,internal.verifyResendKeys.verify, {
            resendApiKey
        });

        if (!ok) throw new Error("Invalid Resend API Key");

        await ctx.db.insert("resendKeys", {
            userId,
            resendApiKey,
            resendDomain
        })
    }
});

export const verified = query({
    args: {},
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);

        if (!userId) throw new Error("Unauthorized");

        const isVerified = await ctx.db.query("resendKeys").withIndex("by_user_id", (q) => q.eq("userId", userId)).unique();

        return !!isVerified;
    }
});

export const getResendKeys = query({
    args: {},
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx);

        if (!userId) throw new Error("Unauthorized");

        const resendKeys = await ctx.db.query("resendKeys").withIndex("by_user_id", (q) => q.eq("userId", userId)).unique();

        return resendKeys;
    }
})