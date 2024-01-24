import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';

import { ModalProvider } from '@/components/providers/modal-provider';

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ClerkProvider>
            <Toaster />
            <ModalProvider />
            {children}
        </ClerkProvider>
    );
};

export default PlatformLayout;
