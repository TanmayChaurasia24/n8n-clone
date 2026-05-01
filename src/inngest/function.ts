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
      experimental_telemetry: {
        isEnabled: true,
        functionId: "joke_agent",
        recordInputs: true,
        recordOutputs: true,
      },
    });

    return steps;
  },
);

export const processTask = inngest.createFunction(
  { id: 'process-task', triggers: [{ event: 'app/task.created' }] },
  async ({ event, step }) => {
    const result = await step.run('handle-task', async () => {
      return { processed: true, id: event.data.id };
    });

    await step.sleep('pause', '15s');

    return { message: `Task ${event.data.email} complete`, result };
  }
);
