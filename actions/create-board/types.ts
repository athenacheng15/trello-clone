import type { Board } from '@prisma/client';
import type { ActionState } from '@/lib/create-safe-atcion';

import { z } from 'zod';

import { CreateBoard } from './schema';

export type InputeType = z.infer<typeof CreateBoard>;
export type ReturnType = ActionState<InputeType, Board>;
