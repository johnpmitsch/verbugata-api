CREATE TABLE IF NOT EXISTS "conjugation" (
	"id" serial PRIMARY KEY NOT NULL,
	"pronoun" text,
	"finite" text,
	"example" text,
	"verb_id" integer,
	"tense_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "language" (
	"id" serial PRIMARY KEY NOT NULL,
	"english_name" text NOT NULL,
	"native_name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tense" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"english_name" text,
	"example" text,
	"example_verb" text,
	"language_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"firstName" text,
	"lastName" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verb" (
	"id" serial PRIMARY KEY NOT NULL,
	"infinitive" text,
	"example" text,
	"rank" integer,
	"regular" boolean DEFAULT false,
	"language_id" integer
);
