import { deleteBoard } from '@/actions/delete-board';
import { Button } from '@/components/ui/button';
import { FormDelete } from './form-delete';

interface BoardProps {
    id: string;
    title: string;
}

export const Board = ({ id, title }: BoardProps) => {
    const deleteBoardWithId = deleteBoard.bind(null, id);
    return (
        <form action={deleteBoardWithId} className="flex items-center gap-x-2">
            <p>{title}</p>
            <FormDelete />
        </form>
    );
};
