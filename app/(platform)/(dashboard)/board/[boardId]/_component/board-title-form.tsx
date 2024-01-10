'use client';
import type { ElementRef } from 'react';

import { useRef, useState } from 'react';

import { FormInput } from '@/components/form/form-input';
import { Button } from '@/components/ui/button';
import { Board } from '@prisma/client';

interface BoardTitleFormProps {
    data: Board;
}

export const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
    const formRef = useRef<ElementRef<'form'>>(null);
    const inputRef = useRef<ElementRef<'input'>>(null);

    const [isEditing, setIsEditing] = useState(false);

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
    const onSubmit = (formData: FormData) => {
        const title = formData.get('title') as string;
    };

    if (isEditing) {
        return (
            <form ref={formRef} className="flex items-center gap-x-2">
                <FormInput
                    ref={inputRef}
                    id="title"
                    onBlur={() => {}}
                    defaultValue={data.title}
                    className="h-7 border-none bg-transparent px-[7px] py-1 text-lg font-bold focus-visible:outline-none focus-visible:ring-transparent"
                />
            </form>
        );
    }
    return (
        <Button
            onClick={enableEditing}
            variant="transparent"
            className="h-auto w-auto p-1 px-2 text-lg font-bold"
        >
            {data.title}
        </Button>
    );
};
