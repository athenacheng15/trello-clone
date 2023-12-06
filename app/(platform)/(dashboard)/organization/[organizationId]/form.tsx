'use client';

import { useFormState } from 'react-dom';

import { create } from '@/actions/create-board';
import { Button } from '@/components/ui/button';

export const Form = () => {
    const initialState = { message: '', errors: {} };
    const [state, dispatch] = useFormState(create, initialState);
    return (
        <form action={dispatch}>
            <div className="flex flex-col space-y-2">
                <input
                    id="title"
                    name="title"
                    required
                    placeholder="Enter a board name"
                    className="border border-black p-1"
                />
                {state?.errors?.title ? (
                    <div>
                        {state.errors.title.map((error: string) => (
                            <p key={error} className="text-rose-500">
                                {error}
                            </p>
                        ))}
                    </div>
                ) : null}
            </div>
            <Button type="submit">Submit</Button>
        </form>
    );
};
