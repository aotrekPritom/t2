import { z } from 'zod';

const createAuthorValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().max(5),
    author: z.object({
      name: z.string().min(1, 'Name is required'),
      bio: z.string().optional(),
      birthdate: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, {
          message: 'Invalid date format. Expected format: YYYY-MM-DD',
        })
        .refine(
          (date) => {
            const parsedDate = new Date(date);
            return !isNaN(parsedDate.getTime());
          },
          {
            message: 'Invalid date',
          },
        ),
    }),
  }),
});
const updateAuthorValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').optional(),
    bio: z.string().optional().optional(),
    birthdate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'Invalid date format. Expected format: YYYY-MM-DD',
      })
      .refine(
        (date) => {
          const parsedDate = new Date(date);
          return !isNaN(parsedDate.getTime());
        },
        {
          message: 'Invalid date',
        },
      )
      .optional(),
  }),
});

export const AuthorValidationSchemas = {
  createAuthorValidationSchema,
  updateAuthorValidationSchema,
};
