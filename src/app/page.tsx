import { cn } from "@/lib/utils";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { UserProfile } from "./client";
import { getQueryClient, trpc } from "@/trpc/server";


export default async function Home() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.getUsers.queryOptions());

  return (
    <div className={cn("flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20")}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UserProfile />
      </HydrationBoundary>
    </div>
  );
}
