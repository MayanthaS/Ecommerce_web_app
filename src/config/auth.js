export const CLERK_PUBLISHABLE_KEY =
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export const CLERK_ENABLED =
  import.meta.env.VITE_ENABLE_CLERK !== "false" &&
  Boolean(CLERK_PUBLISHABLE_KEY);
