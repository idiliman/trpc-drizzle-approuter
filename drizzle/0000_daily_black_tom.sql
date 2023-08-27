CREATE TABLE IF NOT EXISTS "todos" (
	"id" uuid DEFAULT gen_random_uuid(),
	"content" text,
	"done" integer
);
