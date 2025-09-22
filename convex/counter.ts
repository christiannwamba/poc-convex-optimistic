import { mutation, query, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const counter = await ctx.db
      .query("counters")
      .filter((q) => q.eq(q.field("name"), "main"))
      .first();

    return counter?.value ?? 0;
  },
});

export const increment = mutation({
  args: { increment: v.number() },
  handler: async (ctx, args) => {
    // Schedule the actual increment to happen after 1.5 seconds
    // This creates the delay to demonstrate optimistic updates
    await ctx.scheduler.runAfter(1500, internal.counter.performIncrement, {
      increment: args.increment,
    });

    // Return immediately - the optimistic update will handle UI
    return "Increment scheduled";
  },
});

export const performIncrement = internalMutation({
  args: { increment: v.number() },
  handler: async (ctx, args) => {
    const existingCounter = await ctx.db
      .query("counters")
      .filter((q) => q.eq(q.field("name"), "main"))
      .first();

    if (existingCounter) {
      await ctx.db.patch(existingCounter._id, {
        value: existingCounter.value + args.increment,
      });
    } else {
      await ctx.db.insert("counters", {
        name: "main",
        value: args.increment,
      });
    }
  },
});