'use client';

import { ListWithCards } from '@/types';
import { ListForm } from './list-form';

interface ListContainerProps {
    data: ListWithCards[];
    boardId: string;
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
    return (
        <div>
            <ol>
                <ListForm />
                <div className="w-1 flex-shrink-0" />
            </ol>
        </div>
    );
};
