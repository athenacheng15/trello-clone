import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { Board } from '@prisma/client';

interface BoardNavbarProps {
    data: Board;
}

export const BoardNavbar = async ({ data }: BoardNavbarProps) => {
    return (
        <div className=" fixed top-14 z-[40] flex h-14 w-full items-center gap-x-4 bg-black/50 px-6 text-white">
            Board Navbar
        </div>
    );
};
