import { Medal } from 'lucide-react';

const MarketingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
                <div className="mb-4 flex items-center justify-center rounded-full border bg-amber-100 p-4 uppercase text-amber-700 shadow-sm">
                    <Medal className="mr-2 h-6 w-6" />
                    NO 1 task management
                </div>
                <h1 className="text-center text-3xl text-neutral-800 md:text-6xl">
                    Taskify helps team move
                </h1>
                <div className="w-fit rounded-md bg-gradient-to-r from-fuchsia-600 to-pink-600 p-2 px-4 pb-4 text-3xl text-white md:text-6xl">
                    work forword
                </div>
            </div>
            <div className="ms-au mt-4 max-w-xs text-center text-sm text-neutral-400 md:max-w-2xl md:text-lg">
                Collabrate, manage projects, and reach new productivity peaks.
                From high rises to the home office, the way your team works is
                unique - accomplish it all with Taskify.
            </div>
        </div>
    );
};

export default MarketingPage;
