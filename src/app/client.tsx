'use client';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Mail, Calendar, User as UserIcon, Shield, Clock } from 'lucide-react';

export function UserProfile() {
  const trpc = useTRPC();
  const { data: users } = useSuspenseQuery(trpc.getUsers.queryOptions());

  if (!users || users.length === 0) {
    return (
      <div className="text-muted-foreground bg-card flex w-full flex-col items-center justify-center rounded-2xl border border-dashed p-12">
        <UserIcon className="mb-4 h-12 w-12 opacity-50" />
        <p className="text-foreground text-lg font-medium">No users found</p>
        <p className="text-sm">Get started by creating a new user.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h2 className="mb-2 text-3xl font-bold tracking-tight">
            System Users
          </h2>
          <p className="text-muted-foreground text-sm">
            Manage and view all registered users across the platform.
          </p>
        </div>
        <div className="bg-primary/10 border-primary/20 text-primary flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm">
          <Shield className="h-4 w-4" />
          Total Users: {users.length}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="group bg-card border-border hover:border-primary/30 relative flex flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:shadow-lg"
          >
            {/* Decorative glow */}
            <div className="bg-primary/5 group-hover:bg-primary/10 absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-full blur-3xl transition-colors duration-500" />

            <div className="relative z-10 mb-6 flex items-center gap-4">
              <div className="from-primary/10 to-primary/20 border-primary/10 text-primary flex h-14 w-14 items-center justify-center rounded-2xl border bg-gradient-to-br text-xl font-bold shadow-inner">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-foreground truncate text-lg font-semibold">
                  {user.name}
                </h3>
                <div className="text-muted-foreground mt-1 flex items-center gap-2 text-sm">
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{user.email}</span>
                </div>
              </div>
            </div>

            <div className="border-border/50 relative z-10 mt-auto border-t pt-4">
              <div className="text-muted-foreground flex items-center justify-between text-xs font-medium">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Joined</span>
                </div>
                <time
                  dateTime={user.createdAt.toString()}
                  className="flex items-center gap-1.5"
                >
                  <Clock className="h-3.5 w-3.5" />
                  {new Date(user.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
