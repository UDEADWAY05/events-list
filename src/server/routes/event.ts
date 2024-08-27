import { CreateEventSchema, JoinEventSchema, UpdateEventSchema } from '@/shared/api/schema';
import { prisma } from '../db';
import { isAuth, isAuthor, procedure, router } from '../trpc';
import { z } from 'zod';

export const eventRouter = router({
    findMany: procedure.query(async ({ ctx: { user } }) => {
        const events = await prisma.event.findMany({
            include: {
                participations: true
            }
        });

        return events.map(({ participations, ...events }) => ({
            ...events,
            isJoinded: participations.some(({ userId }) => userId === user?.id)
        }));
    }),
    findUnique: procedure.input(
        z.object({
            id: z.number(),
        })
    )
        .use(isAuth)
        .query(({ input }) => {
            return prisma.event.findUnique({
                where: input,
                select: {
                    title: true,
                    description: true,
                    data: true,
                    authorId: true,
                    participations: {
                        select: {
                            user: {
                                select: {
                                    name: true,
                                }
                            },
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
    }),
    leave: procedure.input(JoinEventSchema).use(isAuth).mutation(async ({ input, ctx: { user } }) => {
        return prisma.participation.deleteMany({
            where: {
                eventId: input.id,
                userId: user.id,
            }
        })
    }),
    change: procedure.input(UpdateEventSchema).use(isAuthor).mutation(async ({ input, ctx: { user } }) => {
        console.log(input)
        return prisma.event.update({
            where: {
                id: input.id,
                authorId: user.id
            },
            data: {
                title: input.title,
                description: input.description,
                data: input.data
            }
        })
    })
});