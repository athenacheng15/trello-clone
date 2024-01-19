import { z } from 'zod';

import type { Card } from '@prisma/client';
import type { ActionState } from '@/lib/create-safe-atcion';

import { CreateCard } from './schema';

export type InputeType = z.infer<typeof CreateCard>;
export type ReturnType = ActionState<InputeType, Card>;
