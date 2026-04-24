"use client"
import { useTRPC } from "@/trpc/client"
import { useQuery, useSuspenseQuery } from "@tanstack/react-query"

export function UserProfile() {
    const trpc = useTRPC();

    const { data: users } = useSuspenseQuery(trpc.getUsers.queryOptions());

    return (
        <div>
            {JSON.stringify(users)}
        </div>
    )
}