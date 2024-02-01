'use server';

import type { InputeType, ReturnType } from './types';

import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';
import { ACTION, ENTITY_TYPE } from '@prisma/client';

import { db } from '@/lib/db';
import { createSafeAction } from '@/lib/create-safe-atcion';
import { createAuditLog } from '@/lib/create-audit-log';

import { UpdateList } from './schema';

const handler = async (data: InputeType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: 'Unauthorized',
        };
    }

    const { title, id, boardId } = data;

    let list;

    try {
        list = await db.list.update({
            where: {
                id,
                boardId,
                board: {
                    orgId,
                },
            },
            data: {
                title,
            },
        });
        await createAuditLog({
            entityId: list.id,
            entityTitle: list.title,
            entityType: ENTITY_TYPE.LIST,
            action: ACTION.UPDATE,
        });
    } catch (error) {
        return { error: 'Failed to update.' };
    }

    revalidatePath(`/board/${boardId}`);
    return { data: list };
};

export const updateList = createSafeAction(UpdateList, handler);
