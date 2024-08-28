import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import { ssrPrepass } from '@trpc/next/ssrPrepass';
import superjson from 'superjson';
import type { AppRouter } from '@/server/routes';
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

function getBaseUrl() {
    if (typeof window !== 'undefined')
        return '';
    // if (process.env.VERCEL_URL)
    //     // reference for vercel.com
    //     return `https://${process.env.VERCEL_URL}`;

    // assume localhost
    return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpc = createTRPCNext<AppRouter>({
    ssr: true,
    ssrPrepass,
    transformer: superjson,
    config(opts) {
        const { ctx } = opts;
        if (typeof window !== 'undefined') {
            // during client requests
            return {
                // transformer: superjson,
                links: [
                    httpBatchLink({
                        transformer: superjson,
                        url: '/api/trpc',
                    }),
                ],
            };
        }

        return {
            // transformer: superjson,
            links: [
                httpBatchLink({
                    transformer: superjson,
                    // The server needs to know your app's full url
                    url: `${getBaseUrl()}/api/trpc`,
                    /**
                     * Set custom request headers on every request from tRPC
                     * @link https://trpc.io/docs/v10/header
                     */
                    headers() {
                        if (!ctx?.req?.headers) {
                            return {};
                        }
                        // To use SSR properly, you need to forward client headers to the server
                        // This is so you can pass through things like cookies when we're server-side rendering
                        return {
                            cookie: ctx.req.headers.cookie,
                        };
                    },
                }),
            ],
        };
    },
});

export type RouterInput = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>

export * from "./schema"