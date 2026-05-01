// Import with `import * as Sentry from "@sentry/nextjs"` if you are using ESM
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  // Tracing must be enabled for agent monitoring to work
  tracesSampleRate: 1.0,
  // Add data like inputs and responses to/from LLMs and tools;
  // see https://docs.sentry.io/platforms/javascript/data-management/data-collected/ for more info
  sendDefaultPii: true,
  enableLogs: true,
  debug: false
});