import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { inngest } from './client';
import { generateText } from 'ai';

const google = createGoogleGenerativeAI();

export const executeAI = inngest.createFunction(
  { id: 'execute-ai', triggers: [{ event: 'execute/ai' }] },
  async ({ event, step }) => {
    const { steps } = await step.ai.wrap('gemini-generate-text', generateText, {
      model: google('gemini-2.5-flash'),
      system: 'you are a helpfull assistant',
      prompt: 'write a short story on akhbar and birbal',
    });

    return steps;
  },
);
