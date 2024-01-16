'use client';

import type { ElementRef } from 'react';

import { useRef } from 'react';
import { MoreHorizontal, X } from 'lucide-react';
import { List } from '@prisma/client';

import {
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { FormSubmit } from '@/components/form/form-submit';
import { Separator } from '@/components/ui/separator';
import { useAction } from '@/hooks/use-action';
import { deleteList } from '@/actions/delete-list';
import { toast } from 'sonner';

interface ListOptionsProps {
    data: List;
    onAddCard: () => void;
}
export const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
    const closeRef = useRef<ElementRef<'button'>>(null);

    const { execute: executeDelete } = useAction(deleteList, {
        onSuccess: data => {
            toast.success(`List "${data.title}" delete`);
            closeRef.current?.click();
        },
        onError: error => {
            toast.error(error);
        },
    });

    const onDelete = (formData: FormData) => {
        const id = formData.get('id') as string;
        const boardId = formData.get('boardId') as string;

        executeDelete({ id, boardId });
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="h-auto w-auto p-2" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="px-0 pb-3 pt-3"
                side="bottom"
                align="start"
            >
                <div className=" pb-4 text-center text-sm font-medium text-neutral-600">
                    List actions
                </div>
                <PopoverClose ref={closeRef} asChild>
                    <Button
                        className=" absolute right-2 top-2 h-auto w-auto p-2 text-neutral-600"
                        variant="ghost"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </PopoverClose>
                <Button
                    onClick={onAddCard}
                    className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
                    variant="ghost"
                >
                    Add Cards
                </Button>
                <form>
                    <input hidden name="id" id="id" value={data.id} />
                    <input
                        hidden
                        name="boardId"
                        id="boardId"
                        value={data.boardId}
                    />
                    <FormSubmit
                        className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
                        variant="ghost"
                    >
                        Copy list...
                    </FormSubmit>
                </form>
                <Separator />
                <form action={onDelete}>
                    <input hidden name="id" id="id" value={data.id} />
                    <input
                        hidden
                        name="boardId"
                        id="boardId"
                        value={data.boardId}
                    />
                    <FormSubmit
                        className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
                        variant="ghost"
                    >
                        Delete this list...
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    );
};
