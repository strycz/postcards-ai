import { v } from 'convex/values';
import { action } from './_generated/server';
import { api } from './_generated/api';
import OpenAI from 'openai';

const openai = new OpenAI();

export const chat = action({
  args: {
    messageBody: v.string(),
  },
  handler: async (ctx, args) => {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        {
          role: 'user',
          content: 'Write a haiku about recursion in programming.',
        },
      ],
    });

    const messageContent = completion.choices[0].message;
    console.log(messageContent);

    await ctx.runMutation(api.tasks.send, {
      isCompleted: true,
      text: messageContent?.content || "Sorry, I don't have an answer for that.",
    });
  },
});
