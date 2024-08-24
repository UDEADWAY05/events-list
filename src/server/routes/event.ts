import { CreateEventSchema, JoinEventSchema } from '@/shared/api/schema';
import { prisma } from '../db';
import { isAuth, procedure, router } from '../trpc';
import { z } from 'zod';

export const eventRouter = router({
    findMany: procedure.query(() => {
        return prisma.event.findMany();
    }),
    findUnique: procedure.input(
        z.object({
            id: z.number(),
        })
    ).query(({ input }) => {
        return prisma.event.findUnique({
            where: input,
            include: {
                participations: {
                    include: {
                        user: true,
                    }
                }
            }
        })
    }),
    create: procedure
        .input(CreateEventSchema)
        .use(isAuth)
        .mutation(async ({ input, ctx: { user } }) => {
            return prisma.event.create({
                data: {
                    authorId: user.id,
                    ...input,
                },
            })
        }),
    join: procedure.input(JoinEventSchema).use(isAuth).mutation(async ({ input, ctx: { user } }) => {
        return prisma.participation.create({
            data: {
                eventId: input.id,
                userId: user.id
            }
        })
    })
});