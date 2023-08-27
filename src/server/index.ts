import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { todos } from '../db/schema';
import { publicProcedure, router } from './trpc';
import { Pool } from 'pg';
import z from 'zod';

import { eq } from 'drizzle-orm';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

export const appRouter = router({
  getTodos: publicProcedure.query(async () => {
    return await db.select().from(todos);
  }),
  addTodo: publicProcedure.input(z.string()).mutation(async (opts) => {
    await db.insert(todos).values({ content: opts.input, done: 0 });
    return true;
  }),
  setDone: publicProcedure
    .input(
      z.object({
        id: z.string(),
        done: z.number(),
      })
    )
    .mutation(async (opts) => {
      await db.update(todos).set({ done: opts.input.done }).where(eq(todos.id, opts.input.id));
      return true;
    }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
