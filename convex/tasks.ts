import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const get = query({
  args: {},
  handler: async (ctx) => {
    console.log('Getting tasks');
    return await ctx.db.query('tasks').collect();
  },
});

export const send = mutation({
  args: { isCompleted: v.boolean(), text: v.string() },
  handler: async (ctx, { isCompleted, text }) => {
    await ctx.db.insert('tasks', { isCompleted, text, author: 'stryczniewicz@gmail.com' });
  },
});

export const getForCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error('Not authenticated');
    }
    return await ctx.db
      .query('tasks')
      .filter((q) => q.eq(q.field('author'), identity.email))
      .collect();
  },
});

// export const like = mutation({
//   args: { liker: v.string(), messageId: v.id('tasks') },
//   handler: async (ctx, { liker, messageId }) => {
//     await ctx.db.insert('likes', { liker, messageId });
//   },
// });

export const deleteTask = mutation({
  args: { id: v.id('tasks') },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});
