import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    TooltipProvider,
} from '@/components/ui/tooltip';
import React from 'react';

interface HintProps {
    children: React.ReactNode;
    description: string;
    side?: 'left' | 'right' | 'top' | 'bottom';
    sideOffset?: number;
}

export const Hint = ({
    children,
    description,
    side = 'bottom',
    sideOffset = 0,
}: HintProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger>{children}</TooltipTrigger>
                <TooltipContent
                    sideOffset={sideOffset}
                    side={side}
                    className="max-w-[220px] break-words text-xs"
                >
                    {description}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
