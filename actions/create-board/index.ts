'use server';

import type { InputeType, ReturnType } from './types';

import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';
import { ACTION, ENTITY_TYPE } from '@prisma/client';

import { db } from '@/lib/db';
import { createSafeAction } from '@/lib/create-safe-atcion';
import { createAuditLog } from '@/lib/create-audit-log';
import { incrementAvailableCount, hasAvailableCount } from '@/lib/org-limit';

import { CreateBoard } from './schema';
import { checkSubscription } from '@/lib/subscription';

const handler = async (data: InputeType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: 'Unauthorized',
        };
    }

    const canCreate = await hasAvailableCount();
    const isPro = await checkSubscription();

    if (!canCreate && !isPro) {
        return {
            error: 'You have reached ypur limit of free  boards. Please upgrade to create more.',
        };
    }

    const { title, image } = data;
    const [imageId, imageThunbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
        image.split('|');

    if (
        !imageId ||
        !imageThunbUrl ||
        !imageFullUrl ||
        !imageLinkHTML ||
        !imageUserName
    ) {
        return { error: 'Missing fields. Failed to create board.' };
    }

    let board;

    try {
        board = await db.board.create({
            data: {
                title,
                orgId,
                imageId,
                imageThunbUrl,
                imageFullUrl,
                imageUserName,
                imageLinkHTML,
            },
        });
        if (!isPro) {
            await incrementAvailableCount();
        }
        await createAuditLog({
            entityId: board.id,
            entityTitle: board.title,
            entityType: ENTITY_TYPE.BOARD,
            action: ACTION.CREATE,
        });
    } catch (error) {
        return { error: 'Failed to create' };
    }

    revalidatePath(`/board/${board.id}`);
    return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);
