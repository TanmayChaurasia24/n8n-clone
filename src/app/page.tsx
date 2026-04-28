import { cn } from '@/lib/utils';
import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { requireAuth } from '@/lib/auth-utils';
import { caller } from '@/trpc/server';

const Page = async () => {
  await requireAuth();

  const data = await caller.getUsers();

  return (
    <div
      className={cn(
        'flex min-h-screen flex-col items-center justify-center gap-16 p-8 pb-20 sm:p-20',
      )}
    >
      <div>private page</div>
      <pre>{JSON.stringify(data)}</pre>
    </div>
  );
};

export default Page;
