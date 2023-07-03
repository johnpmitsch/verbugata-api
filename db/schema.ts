import { relations } from "drizzle-orm";
import { pgTable, serial, text, integer, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  firstName: text("firstName"),
  lastName: text("lastName"),
});

export const languages = pgTable("language", {
  id: serial("id").primaryKey(),
  englishName: text("english_name").notNull(),
  nativeName: text("native_name").notNull(),
});

export const languageRelations = relations(languages, ({ many }) => ({
  tenses: many(tenses),
  verbs: many(verbs),
}));

export const tenses = pgTable("tense", {
  id: serial("id").primaryKey(),
  name: text("name"),
  englishName: text("english_name"),
  example: text("example"),
  example_verb: text("example_verb"),
  languageId: integer("language_id"),
});

export const tenseRelations = relations(tenses, ({ one, many }) => ({
  language: one(languages, {
    fields: [tenses.languageId],
    references: [languages.id],
  }),
  conjugations: many(conjugations),
}));

export const verbs = pgTable("verb", {
  id: serial("id").primaryKey(),
  infinitive: text("infinitive"),
  example: text("example"),
  rank: integer("rank"),
  regular: boolean("regular").default(false),
  languageId: integer("language_id"),
});

export const verbRelations = relations(verbs, ({ one, many }) => ({
  language: one(languages, {
    fields: [verbs.languageId],
    references: [languages.id],
  }),
  conjugations: many(conjugations),
}));

export const conjugations = pgTable("conjugation", {
  id: serial("id").primaryKey(),
  pronoun: text("pronoun"),
  finite: text("finite"),
  example: text("example"),
  verbId: integer("verb_id"),
  tenseId: integer("tense_id"),
});

export const conjugationsRelations = relations(conjugations, ({ one }) => ({
  verb: one(verbs, {
    fields: [conjugations.verbId],
    references: [verbs.id],
  }),
  tense: one(tenses, {
    fields: [conjugations.tenseId],
    references: [tenses.id],
  }),
}));
