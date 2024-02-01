'use server';

import type { InputeType, ReturnType } from './types';

import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';
import { ACTION, ENTITY_TYPE } from '@prisma/client';

import { db } from '@/lib/db';
import { createSafeAction } from '@/lib/create-safe-atcion';
import { createAuditLog } from '@/lib/create-audit-log';

import { DeleteList } from './schema';

const handler = async (data: InputeType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: 'Unauthorized',
        };
    }

    const { id, boardId } = data;

    let list;

    try {
        list = await db.list.delete({
            where: {
                id,
                boardId,
                board: {
                    orgId,
                },
            },
        });
        await createAuditLog({
            entityId: list.id,
            entityTitle: list.title,
            entityType: ENTITY_TYPE.LIST,
            action: ACTION.DELETE,
        });
    } catch (error) {
        return { error: 'Failed to delete.' };
    }

    revalidatePath(`/board/${boardId}`);
    return { data: list };
};

export const deleteList = createSafeAction(DeleteList, handler);
