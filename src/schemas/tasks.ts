import { z } from 'zod';

const body = z.object({
  title: z.string(),
  description: z.string(),
});

const params = z.object({
  id: z.string().uuid(),
})

export type Body = z.infer<typeof body>;
export type Params = z.infer<typeof params> 