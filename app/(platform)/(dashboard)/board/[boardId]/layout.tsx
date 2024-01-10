import { auth } from '@clerk/nextjs';
import { notFound, redirect } from 'next/navigation';

import { db } from '@/lib/db';

export async function generateMetadata({
    params,
}: {
    params: { boardId: string };
}) {
    const { orgId } = auth();
    if (!orgId) return { title: 'Board' };

    const board = await db.board.findUnique({
        where: { id: params.boardId, orgId },
    });
    return { title: board?.title || 'Board' };
}

const BoardIdLayout = async ({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { boardId: string };
}) => {
    const { orgId } = auth();
    if (!orgId) return redirect('/select-ord');

    const board = await db.board.findUnique({
        where: { id: params.boardId, orgId },
    });
    if (!board) notFound();

    return (
        <div
            className="relative h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${board.imageFullUrl})` }}
        >
            <main className="relative h-full pt-28">{children}</main>
        </div>
    );
};

export default BoardIdLayout;
