import { integer, pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const todos = pgTable('todos', {
  id: uuid('id').defaultRandom(),
  content: text('content'),
  done: integer('done'),
});
