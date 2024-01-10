import { z } from 'zod';

import type { Board } from '@prisma/client';
import type { ActionState } from '@/lib/create-safe-atcion';

import { DeleteBoard } from './schema';

export type InputeType = z.infer<typeof DeleteBoard>;
export type ReturnType = ActionState<InputeType, Board>;
