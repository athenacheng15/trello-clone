'use client';
import type { ElementRef } from 'react';

import { useState, useRef } from 'react';

import { List } from '@prisma/client';
import { useEventListener } from 'usehooks-ts';
import { FormInput } from '@/components/form/form-input';

interface ListHeaderProps {
    data: List;
}

export const ListHeader = ({ data }: ListHeaderProps) => {
    const [title, setTitle] = useState(data.title);
    const [isEditing, setIsEditing] = useState(false);

    const formRef = useRef<ElementRef<'form'>>(null);
    const inputRef = useRef<ElementRef<'input'>>(null);

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        });
    };

    const disableEditing = () => {
        setIsEditing(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            formRef.current?.requestSubmit();
        }
    };

    useEventListener('keydown', onKeyDown);

    return (
        <div className=" flex items-start justify-between gap-x-2 px-2 pt-2 text-sm font-semibold">
            {isEditing ? (
                <form className="flex-1 px-[2px]">
                    <input hidden id="id" name="id" value={data.id} />
                    <input
                        hidden
                        id="boardId"
                        name="boardId"
                        value={data.boardId}
                    />
                    <FormInput
                        id="title"
                        placeholder="Enter list title..."
                        ref={inputRef}
                        onBlur={() => {}}
                        defaultValue={title}
                        className="h-7 truncate border-transparent bg-transparent px-[7px] py-1 text-sm font-medium transition hover:border-input focus:border-input focus:bg-white"
                    />
                </form>
            ) : (
                <div
                    onClick={enableEditing}
                    className=" h-7 w-full border-transparent px-2.5 py-1 text-sm font-medium"
                >
                    {title}
                </div>
            )}
        </div>
    );
};