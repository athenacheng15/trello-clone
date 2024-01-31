import { z } from 'zod';

import type { Card } from '@prisma/client';
import type { ActionState } from '@/lib/create-safe-atcion';

import { CopyCard } from './schema';

export type InputeType = z.infer<typeof CopyCard>;
export type ReturnType = ActionState<InputeType, Card>;
