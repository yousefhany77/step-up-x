import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    INCLUDE_SEED_DATA: z.boolean(),
    CMS_Access_Token: z.string().min(5),
    CMS_SPACE_ID: z.string().min(5),
    CLERK_SECRET_KEY: z.string().min(5),
    STRIPE_SK: z.string().min(5),
    STRIPE_WEBHOOK_SECRET: z.string().min(5),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(5),
    NEXT_PUBLIC_STRIPE_PK: z.string().min(5),
    NEXT_PUBLIC_BASE_URL: z.string().url(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    INCLUDE_SEED_DATA: Boolean(process.env.INCLUDE_SEED_DATA),
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    CMS_Access_Token: process.env.CMS_Access_Token,
    CMS_SPACE_ID: process.env.CMS_SPACE_ID,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_STRIPE_PK: process.env.NEXT_PUBLIC_STRIPE_PK,
    STRIPE_SK: process.env.STRIPE_SK,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  },
})
