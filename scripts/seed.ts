import fs from "fs";
import path from "path";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";
import { languages, users, verbs } from "../db/schema";
import * as schema from "../db/schema";
import { InferModel } from "drizzle-orm";
import csv from "fast-csv";

dotenv.config();

const db = drizzle(sql, { schema });
const sql = postgres(process.env["DB_URL"] || "missingDB_URL", {});

type NewLanguage = InferModel<typeof languages, "insert">;
type NewVerb = InferModel<typeof verbs, "insert">;

const insertLanguage = async (language: NewLanguage) => {
  return db.insert(languages).values(language).onConflictDoNothing;
};

const insertVerb = async (verb: NewVerb) => {
  return db.insert(verbs).values(verb).onConflictDoNothing;
};

const seed = async () => {
  try {
    console.log("seeding languages");
    const portuguese = await insertLanguage({
      id: 1,
      englishName: "Portuguese",
      nativeName: "Português",
    });

    console.log("seeding verbs");
    fs.createReadStream(path.resolve(__dirname, "..", "csvs", "verbs.csv"))
      .pipe(csv.parse({ headers: true }))
      .pipe(csv.format({ headers: true }))
      .transform(async (row: any, next: any) => {
        const { id, language_id, infinitive, example, regular, rank } = row;
        const values: NewVerb = {
          id,
          languageId: language_id,
          infinitive,
          example,
          regular,
          rank,
        };
        insertVerb(values);
        setImmediate(() => next());
      });

    /**
    console.log("seeding tenses");
    fs.createReadStream(path.resolve(__dirname, "..", "csvs", "tenses.csv"))
      .pipe(csv.parse({ headers: true }))
      .pipe(csv.format({ headers: true }))
      .transform(async (row: any, next: any) => {
        const { language_id, name, english_name, example, example_verb } = row;
        await prisma.tense.upsert({
          where: { name },
          update: {},
          create: {
            name,
            english_name,
            example,
            example_verb,
            language: { connect: { id: parseInt(language_id) } },
          },
        });
        setImmediate(() => next());
      })

    console.log("seeding conjugations");
    fs.createReadStream(
      path.resolve(__dirname, "..", "csvs", "conjugations.csv")
    )
      .pipe(csv.parse({ headers: true }))
      .pipe(csv.format({ headers: true }))
      .transform(async (row: any, next: any) => {
        const { id, verb_id, tense_id, pronoun, finite } = row;
        console.log(`seeding conjugation #${id}`);
        await prisma.conjugation.upsert({
          where: { pronoun_finite: { pronoun, finite } },
          update: {},
          create: {
            finite,
            pronoun,
            verb: { connect: { id: parseInt(verb_id) } },
            tense: { connect: { id: parseInt(tense_id) } },
          },
        });
        setImmediate(() => next());
      })
      */
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

seed();
