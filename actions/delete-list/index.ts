'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';

import { db } from '@/lib/db';
import { createSafeAction } from '@/lib/create-safe-atcion';

import { DeleteList } from './schema';
import { InputeType, ReturnType } from './types';

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
    } catch (error) {
        return { error: 'Failed to delete.' };
    }

    revalidatePath(`/board/${boardId}`);
    return { data: list };
};

export const deleteList = createSafeAction(DeleteList, handler);
