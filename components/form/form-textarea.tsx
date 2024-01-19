'use client';

import type { KeyboardEventHandler } from 'react';
import { useFormStatus } from 'react-dom';

import { forwardRef } from 'react';

import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { FormErrors } from './form-errors';

interface FormTextareaProps {
    id: string;
    lable?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    errors?: Record<string, string[] | undefined>;
    className?: string;
    onBlur?: () => void;
    onClick?: () => void;
    onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
    defaultValue?: string;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
    (
        {
            id,
            lable,
            placeholder,
            required,
            errors,
            disabled,
            className,
            onBlur,
            onClick,
            onKeyDown,
            defaultValue,
        },
        ref,
    ) => {
        const { pending } = useFormStatus();
        return (
            <div className="w-full space-y-2">
                <div className="w-full space-y-1">
                    {lable ? (
                        <Label
                            htmlFor={id}
                            className="text-xs font-semibold text-neutral-700"
                        >
                            {lable}
                        </Label>
                    ) : null}
                    <Textarea
                        onKeyDown={onKeyDown}
                        onBlur={onBlur}
                        onClick={onClick}
                        ref={ref}
                        required={required}
                        placeholder={placeholder}
                        name={id}
                        id={id}
                        disabled={pending || disabled}
                        className={
                            (cn(
                                'resize-none shadow-sm outline-none ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                            ),
                            className)
                        }
                        aria-describedby={`${id}-error`}
                        defaultValue={defaultValue}
                    />
                </div>
                <FormErrors id={id} errors={errors} />
            </div>
        );
    },
);

FormTextarea.displayName = 'FormTextarea';
