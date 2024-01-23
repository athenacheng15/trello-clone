import { z } from 'zod';

import type { List } from '@prisma/client';
import type { ActionState } from '@/lib/create-safe-atcion';

import { UpdateListOrder } from './schema';

export type InputeType = z.infer<typeof UpdateListOrder>;
export type ReturnType = ActionState<InputeType, List[]>;
