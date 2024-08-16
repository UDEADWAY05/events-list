import { prisma } from '../db';
import { procedure, router } from '../trpc';
import { z } from 'zod';

export const eventRouter = router({
    findMany: procedure.query(() => {
        return prisma.event.findMany();
    }),
    create: procedure.input(z.object({
        title: z.string(),
        descriprion: z.string().optional(),
        data: z.coerce.date(), // опечатка в слове date
    })).mutation(async ({ input }) => {
        const user = await prisma.user.findFirstOrThrow()
        return prisma.event.create({
            data: {
                authorId: user.id,
                ...input,
            },
        })
    })
})