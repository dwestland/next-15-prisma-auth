// This will run the Node.js runtime rather than the Edge runtime.
// next-auth v5 runs the Edge runtime and Prisma Adapter is not compatible with it.
export const runtime = 'nodejs'
import { handlers } from '@/auth'

export const { GET, POST } = handlers
