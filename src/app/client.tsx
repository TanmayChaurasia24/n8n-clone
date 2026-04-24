"use client"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Mail, Calendar, User as UserIcon, Shield, Clock } from "lucide-react"

export function UserProfile() {
    const trpc = useTRPC();
    const { data: users } = useSuspenseQuery(trpc.getUsers.queryOptions());

    if (!users || users.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-muted-foreground w-full border border-dashed rounded-2xl bg-card">
                <UserIcon className="w-12 h-12 mb-4 opacity-50" />
                <p className="text-lg font-medium text-foreground">No users found</p>
                <p className="text-sm">Get started by creating a new user.</p>
            </div>
        )
    }

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8">
            <div className="mb-10 flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight mb-2">System Users</h2>
                    <p className="text-muted-foreground text-sm">
                        Manage and view all registered users across the platform.
                    </p>
                </div>
                <div className="px-4 py-2 bg-primary/10 rounded-full border border-primary/20 text-sm font-semibold text-primary shadow-sm flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Total Users: {users.length}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="group relative flex flex-col p-6 rounded-2xl bg-card border border-border hover:shadow-lg hover:border-primary/30 transition-all duration-300 overflow-hidden"
                    >
                        {/* Decorative glow */}
                        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />

                        <div className="flex items-center gap-4 mb-6 relative z-10">
                            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/20 border border-primary/10 text-primary font-bold text-xl shadow-inner">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-foreground truncate">
                                    {user.name}
                                </h3>
                                <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                                    <Mail className="w-3.5 h-3.5 shrink-0" />
                                    <span className="truncate">{user.email}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto pt-4 border-t border-border/50 relative z-10">
                            <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>Joined</span>
                                </div>
                                <time dateTime={user.createdAt.toString()} className="flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5" />
                                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </time>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}