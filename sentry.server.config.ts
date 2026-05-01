// Import with `import * as Sentry from "@sentry/nextjs"` if you are using ESM
const Sentry = require("@sentry/nextjs");

Sentry.init({
  dsn: "https://e92e3d379658d3642a8248a308ffe5bc@o4511314497110016.ingest.de.sentry.io/4511314499469392",
  // Tracing must be enabled for agent monitoring to work
  tracesSampleRate: 1.0,
  // Add data like inputs and responses to/from LLMs and tools;
  // see https://docs.sentry.io/platforms/javascript/data-management/data-collected/ for more info
  sendDefaultPii: true,
  enableLogs: true,
  debug: false
});