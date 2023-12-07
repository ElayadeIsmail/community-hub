import { z } from 'zod';

const EnvSchema = z.object({
	NODE_ENV: z.enum(['production', 'development', 'test'] as const),
	DATABASE_URL: z.string(),
	COOKIE_SECRET: z.string(),
});

const result = EnvSchema.safeParse(process.env);
if (!result.success) {
	console.log('Missing Env vars', result.error.formErrors.fieldErrors);
	process.exit(1);
}

export const Env = result.data;

declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof EnvSchema> {}
	}
}
