import { User2, HelpCircle } from 'lucide-react';

import { Hint } from '@/components/hint';

export const BoardList = () => {
    return (
        <div className="space-y-4">
            <div className="flex items-center text-lg font-semibold text-neutral-700">
                <User2 className="mr-2 h-6 w-6" />
                Your Boards
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                <div
                    role="button"
                    className="relative flex aspect-video h-full w-full flex-col items-center justify-center gap-y-1 rounded-sm bg-muted transition hover:opacity-75"
                >
                    <p className="text-sm">Create New Board</p>
                    <span className="text-xs">5 remaining</span>
                    <Hint
                        sideOffset={40}
                        description={`Free Workspace can have up to 5 open boards> For unlimited boards upgrade this workspaces.`}
                    >
                        <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
                    </Hint>
                </div>
            </div>
        </div>
    );
};
