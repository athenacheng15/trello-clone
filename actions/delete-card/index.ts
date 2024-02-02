'use server';

import type { InputeType, ReturnType } from './types';

import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';
import { ACTION, ENTITY_TYPE } from '@prisma/client';

import { db } from '@/lib/db';
import { createSafeAction } from '@/lib/create-safe-atcion';
import { createAuditLog } from '@/lib/create-audit-log';

import { DeleteCard } from './schema';

const handler = async (data: InputeType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: 'Unauthorized',
        };
    }

    const { id, boardId } = data;

    let card;

    try {
        card = await db.card.delete({
            where: {
                id,
                list: {
                    board: {
                        orgId,
                    },
                },
            },
        });
        await createAuditLog({
            entityId: card.id,
            entityTitle: card.title,
            entityType: ENTITY_TYPE.CARD,
            action: ACTION.DELETE,
        });
    } catch (error) {
        return { error: 'Failed to delete.' };
    }

    revalidatePath(`/board/${boardId}`);
    return { data: card };
};

export const deleteCard = createSafeAction(DeleteCard, handler);
