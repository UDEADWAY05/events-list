import { z } from "zod";

export const CreateEventSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    data: z.coerce.date(), // опечатка в слове date
})

export type CreateEventSchema = z.infer<typeof CreateEventSchema>

export const JoinEventSchema = z.object({
    id: z.number().int().positive(),
    
})