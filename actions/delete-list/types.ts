import { z } from 'zod';

import type { List } from '@prisma/client';
import type { ActionState } from '@/lib/create-safe-atcion';

import { DeleteList } from './schema';

export type InputeType = z.infer<typeof DeleteList>;
export type ReturnType = ActionState<InputeType, List>;
