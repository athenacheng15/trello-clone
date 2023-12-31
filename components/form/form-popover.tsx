'use client';

import { X } from 'lucide-react';
import { toast } from 'sonner';

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverClose,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

import { useAction } from '@/hooks/use-action';
import { createBoard } from '@/actions/create-board';

import { FormInput } from './form-input';
import { FormSubmit } from './form-button';
import { error } from 'console';

interface FormPopoverProps {
    children: React.ReactNode;
    side?: 'left' | 'right' | 'top' | 'bottom';
    align?: 'start' | 'center' | 'end';
    sideOffset?: number;
}

export const FormPopover = ({
    children,
    side = 'bottom',
    align,
    sideOffset = 0,
}: FormPopoverProps) => {
    const { execute, fieldErrors } = useAction(createBoard, {
        onSuccess: data => {
            console.log({ data });
            toast.success('Board created');
        },
        onError: error => {
            console.log({ error });
            toast.error(error);
        },
    });

    const onSubmit = (formData: FormData) => {
        const title = formData.get('title') as string;
        execute({ title });
    };
    return (
        <Popover>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
            <PopoverContent
                className="w-80 pt-3"
                align={align}
                side={side}
                sideOffset={sideOffset}
            >
                <div className=" pb-4 text-center text-sm font-medium text-neutral-600">
                    Create board
                </div>
                <PopoverClose asChild>
                    <Button
                        className="absolute right-2 top-2 h-auto w-auto p-2 text-neutral-600"
                        variant="ghost"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </PopoverClose>
                <form action={onSubmit} className="space-y-4">
                    <div className="space-y-4">
                        <FormInput
                            id="title"
                            label="Board title"
                            type="text"
                            errors={fieldErrors}
                        />
                    </div>
                    <FormSubmit className="w-full">Create</FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    );
};
