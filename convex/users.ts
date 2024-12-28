
import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { getAuthUserId } from '@convex-dev/auth/server';
import { internal } from './_generated/api';

export const currentUser = query({
    handler: async (ctx, _args) => {
        const userId = await getAuthUserId(ctx);
        if (userId === null) return null;
        return await ctx.db.get(userId)
    }
});

export const sendEmail = mutation({
    args: {
        to: v.string(),
        body: v.string(),
        subject: v.string(),
    },
    handler: async (ctx, { to, body, subject }) => {
        const userId = await getAuthUserId(ctx);
        if (userId === null) throw new Error("Unauthorized");

        const userResendAccount = await ctx.db.query("resendKeys").withIndex("by_user_id", (q) => q.eq("userId", userId)).unique();

        if (!userResendAccount) throw new Error("User not found");

        // Make the scheduler a cron job
        try {
            await ctx.scheduler.runAfter(3000, internal.email.constructEmail, {
                to,
                body,
                subject,
                from: userResendAccount.resendDomain,
                resendApiKey: userResendAccount.resendApiKey
            });

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
})