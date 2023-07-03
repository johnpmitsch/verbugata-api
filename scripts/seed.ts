import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";
import { languages, tenses, users, verbs } from "../db/schema";
import * as schema from "../db/schema";
import { InferModel } from "drizzle-orm";
import Papa from "papaparse";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const sql = postgres(process.env["DB_URL"] || "missingDB_URL", {});
const db = drizzle(sql, { schema });

type NewLanguage = InferModel<typeof languages, "insert">;
type NewVerb = InferModel<typeof verbs, "insert">;
type NewTense = InferModel<typeof tenses, "insert">;

const insertLanguage = async (language: NewLanguage) => {
  return db.insert(languages).values(language).onConflictDoNothing;
};

const insertVerb = async (verb: NewVerb) => {
  return await db.insert(verbs).values(verb);
};

const insertTense = async (tense: NewTense) => {
  return await db.insert(tenses).values(tense).onConflictDoNothing();
};

const allTenses: NewTense[] = [];
const seedLanguagesAndVerbs = async () => {
  try {
    console.log("seeding...");
    await insertLanguage({
      id: 1,
      englishName: "Portuguese",
      nativeName: "Português",
    });

    const tensesFile = fs.readFileSync(
      path.resolve(__dirname, "..", "csvs", "tenses.csv"),
      "utf8"
    );
    Papa.parse(tensesFile, {
      header: true,
      complete: (results, file) => {
        results.data.map((result) => {
          const { id, language_id, name, english_name, example, example_verb } =
            result;
          if (id) {
            const values: NewTense = {
              id: parseInt(id),
              name,
              englishName: english_name,
              example,
              example_verb: example_verb,
              languageId: parseInt(language_id),
            };
            allTenses.push(values);
          }
        });
      },
    });
    /**
      fs
        .createReadStream(path.resolve(__dirname, "..", "csvs", "verbs.csv"))
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
          await insertVerb(values);
          setImmediate(() => next());
        })
        .on("end", () => process.exit())
        */
    /**
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
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

const seedTenses = async () => {
  try {
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

await seedLanguagesAndVerbs();
await Promise.all(
  allTenses.map(async (tense) => {
    console.log(tense);
    await insertTense(tense);
    console.log("DONE");
  })
);
//await seedTenses();
process.exit(0);
