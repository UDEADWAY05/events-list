import { prisma } from '../db';
import { procedure, router } from '../trpc';

export const eventRouter = router({
    findMany: procedure.query(() => {
        return prisma.event.findMany();
    })
})