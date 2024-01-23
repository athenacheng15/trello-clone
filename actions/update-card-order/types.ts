import { z } from 'zod';

import type { Card } from '@prisma/client';
import type { ActionState } from '@/lib/create-safe-atcion';

import { UpdateCardOrder } from './schema';

export type InputeType = z.infer<typeof UpdateCardOrder>;
export type ReturnType = ActionState<InputeType, Card[]>;
