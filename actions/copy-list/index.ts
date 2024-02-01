'use server';

import type { InputeType, ReturnType } from './types';

import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';
import { ACTION, ENTITY_TYPE } from '@prisma/client';

import { db } from '@/lib/db';
import { createSafeAction } from '@/lib/create-safe-atcion';
import { createAuditLog } from '@/lib/create-audit-log';

import { CopyList } from './schema';

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
        const listToCopy = await db.list.findUnique({
            where: {
                id,
                boardId,
                board: {
                    orgId,
                },
            },
            include: {
                cards: true,
            },
        });

        if (!listToCopy) {
            return { error: 'List not found' };
        }

        const lastList = await db.list.findFirst({
            where: { boardId },
            orderBy: { order: 'desc' },
            select: { order: true },
        });

        const newOrder = lastList ? lastList?.order + 1 : 1;

        list = await db.list.create({
            data: {
                boardId: listToCopy.boardId,
                title: `${listToCopy.title} - Copy`,
                order: newOrder,
                cards: {
                    createMany: {
                        data: listToCopy.cards.map(
                            ({ title, description, order }) => ({
                                title,
                                description,
                                order,
                            }),
                        ),
                    },
                },
            },
            include: { cards: true },
        });

        await createAuditLog({
            entityId: list.id,
            entityTitle: list.title,
            entityType: ENTITY_TYPE.LIST,
            action: ACTION.CREATE,
        });
    } catch (error) {
        return { error: 'Failed to copy.' };
    }

    revalidatePath(`/board/${boardId}`);
    return { data: list };
};

export const copyList = createSafeAction(CopyList, handler);
