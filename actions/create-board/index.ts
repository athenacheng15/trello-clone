'use server';

import { auth } from '@clerk/nextjs';
import { InputeType, ReturnType } from './types';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-atcion';
import { CreateBoard } from './schema';

const handler = async (data: InputeType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: 'Unauthorized',
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
    } catch (error) {
        return { error: 'Failed to create' };
    }

    revalidatePath(`/board/${board.id}`);
    return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);
