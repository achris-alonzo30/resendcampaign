import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";
 
const schema = defineSchema({
  ...authTables,
  resendKeys: defineTable({
    userId: v.id("users"),
    resendApiKey: v.string(),
    resendDomain: v.string(),
  }).index("by_user_id", ["userId"]),
  // Your other tables...
});
 
export default schema;