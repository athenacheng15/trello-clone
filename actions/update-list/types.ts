import { z } from 'zod';

import type { List } from '@prisma/client';
import type { ActionState } from '@/lib/create-safe-atcion';

import { UpdateList } from './schema';

export type InputeType = z.infer<typeof UpdateList>;
export type ReturnType = ActionState<InputeType, List>;
