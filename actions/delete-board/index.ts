'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';

import { db } from '@/lib/db';
import { createSafeAction } from '@/lib/create-safe-atcion';

import { DeleteBoard } from './schema';
import { InputeType, ReturnType } from './types';
import { redirect } from 'next/navigation';

const handler = async (data: InputeType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: 'Unauthorized',
        };
    }

    const { id } = data;

    let board;

    try {
        board = await db.board.delete({
            where: {
                id,
                orgId,
            },
        });
    } catch (error) {
        return { error: 'Failed to delete.' };
    }

    revalidatePath(`/organization/${orgId}`);
    redirect(`/organization/${orgId}`);
};

export const deleteBoard = createSafeAction(DeleteBoard, handler);
