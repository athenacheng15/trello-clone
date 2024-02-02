'use client';

import { toast } from 'sonner';

import { stripeRedirect } from '@/actions/stripe-redirect';
import { Button } from '@/components/ui/button';
import { useAction } from '@/hooks/use-action';
import { useProModal } from '@/hooks/use-pro-modal';

export const SubscriptionButton = ({ isPro }: { isPro: boolean }) => {
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
        if (isPro) {
            execute({});
        } else {
            proModal.onOpen();
        }
    };

    return (
        <Button disabled={isLoading} onClick={onClick} variant="primary">
            {isPro ? 'Manage subscription' : 'Upgrade to pro'}
        </Button>
    );
};
