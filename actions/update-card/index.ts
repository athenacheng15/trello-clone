'use server';

import { auth } from '@clerk/nextjs';
import { InputeType, ReturnType } from './types';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-atcion';
import { UpdateCard } from './schema';

const handler = async (data: InputeType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: 'Unauthorized',
        };
    }

    const { id, boardId, ...values } = data;

    let card;

    try {
        card = await db.card.update({
            where: {
                id,
                list: {
                    board: {
                        orgId,
                    },
                },
            },
            data: {
                ...values,
            },
        });
    } catch (error) {
        return { error: 'Failed to update.' };
    }

    revalidatePath(`/board/${boardId}`);
    return { data: card };
};

export const updateCard = createSafeAction(UpdateCard, handler);
