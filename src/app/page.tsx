"use client"

import { cn } from '@/lib/utils';
import { useTRPC } from '@/trpc/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Page = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());
  const router = useRouter();

  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
      },
    }),
  );

  const testAi = useMutation(trpc.testAi.mutationOptions());


  return (
    <div
      className={cn(
        'flex min-h-screen flex-col items-center justify-center gap-16 p-8 pb-20 sm:p-20',
      )}
    >
      <div>private page</div>
      <pre>{JSON.stringify(data)}</pre>

      <Button disabled={create.isPending} onClick={() => create.mutate()}> create workflow </Button>

      <Button
        onClick={async () => {
          await authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push('/login');
              },
            },
          });
        }}
      >
        Log out
      </Button>

      <Button disabled={testAi.isPending} onClick={() => testAi.mutate()}>
        Test AI
      </Button>
    </div>
  );
};

export default Page;
