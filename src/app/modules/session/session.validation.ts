import { z } from 'zod';

const createSessionValidationSchema = z.object({
  body: z.object({
    startDate: z.string(),
    endDate: z.string(),
    streamUrl: z.string(),
  }),
});

export const SessionValidationSchemas = {
  createSessionValidationSchema,
};
