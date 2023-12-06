'use server';

import { z } from 'zod';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

const CreateBoard = z.object({
    title: z.string(),
});

export async function create(formData: FormData) {
    // like api

    const { title } = CreateBoard.parse({ title: formData.get('title') });
    await db.board.create({
        data: {
            title,
        },
    });

    revalidatePath('/organization/org_2Z7JeewWAEDHWyC3XXH8GbTHcGg');
}
