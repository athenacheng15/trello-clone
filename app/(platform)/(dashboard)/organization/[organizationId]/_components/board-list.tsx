import { User2, HelpCircle } from 'lucide-react';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import Link from 'next/link';

import { db } from '@/lib/db';
import { Hint } from '@/components/hint';
import { FormPopover } from '@/components/form/form-popover';
import { Skeleton } from '@/components/ui/skeleton';
import { MAX_FREE_BOARD } from '@/constants/boards';
import { gatAvailableCount } from '@/lib/org-limit';
import { checkSubscription } from '@/lib/subscription';

export const BoardList = async () => {
    const { orgId } = auth();

    if (!orgId) return redirect('/select-org');

    const boards = await db.board.findMany({
        where: { orgId },
        orderBy: { createdAt: 'desc' },
    });

    const availableCount = await gatAvailableCount();
    const isPro = await checkSubscription();

    return (
        <div className="space-y-4">
            <div className="flex items-center text-lg font-semibold text-neutral-700">
                <User2 className="mr-2 h-6 w-6" />
                Your Boards
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {boards.map(board => (
                    <Link
                        key={board.id}
                        href={`/board/${board.id}`}
                        className="group relative aspect-video h-full w-full overflow-hidden rounded-sm bg-sky-700 bg-cover bg-center bg-no-repeat p-2"
                        style={{
                            backgroundImage: `url(${board.imageThunbUrl})`,
                        }}
                    >
                        <div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/40" />
                        <p className="relative font-semibold text-white">
                            {board.title}
                        </p>
                    </Link>
                ))}
                <FormPopover sideOffset={10} side="right">
                    <div
                        role="button"
                        className="relative flex aspect-video h-full w-full flex-col items-center justify-center gap-y-1 rounded-sm bg-muted transition hover:opacity-75"
                    >
                        <p className="text-sm">Create New Board</p>
                        <span className="text-xs">
                            {isPro
                                ? 'Unlimited'
                                : `${
                                      MAX_FREE_BOARD - availableCount
                                  } remaining`}
                        </span>
                        <Hint
                            sideOffset={40}
                            description={`Free Workspace can have up to 5 open boards> For unlimited boards upgrade this workspaces.`}
                        >
                            <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
                        </Hint>
                    </div>
                </FormPopover>
            </div>
        </div>
    );
};

BoardList.Skeleton = function SkeletonBoardList() {
    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
        </div>
    );
};