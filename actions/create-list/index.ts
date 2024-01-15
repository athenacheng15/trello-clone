'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';

import { db } from '@/lib/db';
import { createSafeAction } from '@/lib/create-safe-atcion';

import { InputeType, ReturnType } from './types';
import { CreateList } from './schema';

const handler = async (data: InputeType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: 'Unauthorized',
        };
    }

    const { title, boardId } = data;

    let list;

    try {
        const board = await db.board.findUnique({
            where: {
                id: boardId,
                orgId,
            },
        });

        if (!board) {
            return {
                error: 'Board not found',
            };
        }

        const lastList = await db.list.findFirst({
            where: { boardId },
            orderBy: { order: 'desc' },
            select: { order: true },
        });

        const newOrder = lastList ? lastList.order + 1 : 1;

        list = await db.list.create({
            data: {
                title,
                boardId,
                order: newOrder,
            },
        });
    } catch (error) {
        return { error: 'Failed to create.' };
    }

    revalidatePath(`/board/${boardId}`);
    return { data: list };
};

export const createList = createSafeAction(CreateList, handler);
