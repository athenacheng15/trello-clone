import { z } from 'zod';

import type { Card } from '@prisma/client';
import type { ActionState } from '@/lib/create-safe-atcion';

import { StripeRedirect } from './schema';

export type InputeType = z.infer<typeof StripeRedirect>;
export type ReturnType = ActionState<InputeType, string>;
