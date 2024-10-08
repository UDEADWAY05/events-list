import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { initTRPC, type inferAsyncReturnType } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { getServerSession } from 'next-auth';

export const createContext = async ({ req, res }: CreateNextContextOptions) => {
    const session = await getServerSession(req, res, authOptions);

    console.log(session)

    return {
        user: session?.user,
    };
};

export type Context = inferAsyncReturnType<typeof createContext>