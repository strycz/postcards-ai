import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  tasks: defineTable({
    isCompleted: v.boolean(),
    text: v.string(),
  }),
  likes: defineTable({
    liker: v.string(),
    messageId: v.id('tasks'),
  }).index('byMessageId', ['messageId']),
});
