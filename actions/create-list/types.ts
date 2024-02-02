import { z } from 'zod';

import type { List } from '@prisma/client';
import type { ActionState } from '@/lib/create-safe-atcion';

import { CreateList } from './schema';

export type InputeType = z.infer<typeof CreateList>;
export type ReturnType = ActionState<InputeType, List>;
