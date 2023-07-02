CREATE TABLE IF NOT EXISTS "Conjugation" (
	"id" serial PRIMARY KEY NOT NULL,
	"pronoun" text,
	"finite" text,
	"example" text,
	"verbId" integer,
	"tenseId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Language" (
	"id" serial PRIMARY KEY NOT NULL,
	"english_name" text NOT NULL,
	"native_name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Tense" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"english_name" text,
	"example" text,
	"example_verb" text,
	"languageId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"firstName" text,
	"lastName" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Verb" (
	"id" serial PRIMARY KEY NOT NULL,
	"infinitive" text,
	"example" text,
	"rank" integer,
	"regular" boolean DEFAULT false,
	"languageId" integer
);
