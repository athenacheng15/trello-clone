'use client';

import Image from 'next/image';

import { useProModal } from '@/hooks/use-pro-modal';
import { useAction } from '@/hooks/use-action';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { stripeRedirect } from '@/actions/stripe-redirect';
import { toast } from 'sonner';

export const ProModal = () => {
    const proModal = useProModal();
    const { execute, isLoading } = useAction(stripeRedirect, {
        onSuccess: data => {
            window.location.href = data;
        },
        onError: error => {
            toast.error(error);
        },
    });

    const onClick = () => {
        execute({});
    };

    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent className="max-w-md overflow-hidden p-0">
                <div className="relative flex aspect-video items-center justify-center">
                    <Image
                        src="/hero.svg"
                        alt="Hero"
                        className="object-center"
                        fill
                    />
                </div>
                <div className="mx-auto space-y-6 p-6 text-neutral-700">
                    <h2 className=" text-xl font-semibold">
                        Upgrade to Taskify Pro Today!
                    </h2>
                    <p className="text-xs font-semibold text-neutral-600">
                        Explore the best of Taskify
                    </p>
                    <div className="pl-3">
                        <ul className="test-sm list-disc">
                            <li>Unlimited boards</li>
                            <li>Advanced checklists</li>
                            <li>Admin and security feature</li>
                            <li>And more!</li>
                        </ul>
                    </div>
                    <Button
                        disabled={isLoading}
                        onClick={onClick}
                        className=" w-full"
                        variant="primary"
                    ></Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
