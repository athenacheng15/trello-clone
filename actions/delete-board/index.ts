'use server';

import type { InputeType, ReturnType } from './types';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';
import { ACTION, ENTITY_TYPE } from '@prisma/client';

import { db } from '@/lib/db';
import { createSafeAction } from '@/lib/create-safe-atcion';
import { createAuditLog } from '@/lib/create-audit-log';
import { decreaseAvailableCount } from '@/lib/org-limit';

import { DeleteBoard } from './schema';
import { checkSubscription } from '@/lib/subscription';

const handler = async (data: InputeType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: 'Unauthorized',
        };
    }
    const isPro = await checkSubscription();

    const { id } = data;

    let board;

    try {
        board = await db.board.delete({
            where: {
                id,
                orgId,
            },
        });
        if (!isPro) {
            await decreaseAvailableCount();
        }

        await createAuditLog({
            entityId: board.id,
            entityTitle: board.title,
            entityType: ENTITY_TYPE.BOARD,
            action: ACTION.DELETE,
        });
    } catch (error) {
        return { error: 'Failed to delete.' };
    }

    revalidatePath(`/organization/${orgId}`);
    redirect(`/organization/${orgId}`);
};

export const deleteBoard = createSafeAction(DeleteBoard, handler);
