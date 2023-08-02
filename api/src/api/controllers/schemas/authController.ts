import { z } from 'zod';

export const signupSchema = z.object({
	email: z.string().email(),
	password: z.string().min(3).max(100),
	age: z.number().int().min(18).max(100),
});

export const signinSchema = z.object({
	email: z.string().email(),
	password: z.string().min(3).max(100),
});
