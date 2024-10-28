import { z } from 'zod';

const createCourseValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'name is required'),
    description: z.string().optional(),
    price: z.number(),
  }),
});
const updateCourseValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
  }),
});

export const CourseValidationSchemas = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
