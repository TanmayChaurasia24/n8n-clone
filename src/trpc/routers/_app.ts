import { inngest } from '@/inngest/client';
import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';

export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany();
  }),

  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "app/task.created",
      data: {
        email: "tam@gmail.com"
      }
    })


    return prisma.workflow.create({
      data: {
        name: "test-workflow"
      }
    })
  })
});

// export type definition of API
export type AppRouter = typeof appRouter;
