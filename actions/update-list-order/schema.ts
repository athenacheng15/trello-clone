import { z } from 'zod';

export const UpdateListOrder = z.object({
    items: z.array(
        z.object({
            id: z.string(),
            title: z.string(),
            order: z.number(),
            createAt: z.date(),
            update: z.date(),
        }),
    ),
    boardId: z.string(),
});
