import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('tasks').collect();
  },
});

export const send = mutation({
  args: { isCompleted: v.boolean(), text: v.string() },
  handler: async (ctx, { isCompleted, text }) => {
    await ctx.db.insert('tasks', { isCompleted, text });
  },
});
