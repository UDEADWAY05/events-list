import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import { Context } from './context';
import { prisma } from './db';

const t = initTRPC.context<Context>().create({
    transformer: superjson,
});

export const router = t.router;
export const procedure = t.procedure;

export const isAuth = t.middleware(async (opts) => {
    const { ctx } = opts;

    if (!ctx.user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return opts.next({
        ctx: {
            user: ctx.user,
        },
    });
});

export const isAuthor = t.middleware(async (opts) => {
    const { ctx } = opts;
    const eventId = opts.input?.id; // Предполагается, что id события передается в контекст

    if (!ctx.user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    const event = await prisma.event.findUnique({ where: { id: eventId } });

    if (!event) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Event not found' });
    }

    console.log(event?.authorId !== ctx.user.id)

    if (event.authorId !== ctx.user.id) {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'User is not the author of this event' });
    }

    return opts.next({
        ctx: {
            user: ctx.user,
            eventId
        },
    });
});