'use client';

import type { ListWithCards } from '@/types';

import { useEffect, useState } from 'react';

import { ListForm } from './list-form';
import { ListItem } from './list-item';

interface ListContainerProps {
    data: ListWithCards[];
    boardId: string;
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
    const [orderedData, setOrderedData] = useState(data);

    useEffect(() => {
        setOrderedData(data);
    }, [data]);

    return (
        <div>
            <ol className="flex h-full gap-x-3">
                {orderedData.map((list, index) => (
                    <ListItem key={list.id} index={index} data={list} />
                ))}
                <ListForm />
                <div className="w-1 flex-shrink-0" />
            </ol>
        </div>
    );
};
