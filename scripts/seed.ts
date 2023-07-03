import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";
import { languages, tenses, verbs, conjugations } from "../db/schema";
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
type NewConjugation = InferModel<typeof conjugations, "insert">;

const insertLanguage = async (language: NewLanguage) => {
  return await db.insert(languages).values(language).onConflictDoNothing();
};

const insertVerb = async (verb: NewVerb) => {
  return await db.insert(verbs).values(verb).onConflictDoNothing();
};

const insertTense = async (tense: NewTense) => {
  return await db.insert(tenses).values(tense).onConflictDoNothing();
};

const insertConjugation = async (conjugation: NewConjugation) => {
  return await db
    .insert(conjugations)
    .values(conjugation)
    .onConflictDoNothing();
};

const allTenses: NewTense[] = [];
const allVerbs: NewVerb[] = [];
const allConjugations: NewConjugation[] = [];

const seedLanguagesAndTenses = async () => {
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
          console.log("hi");
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
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

const seedVerbs = async () => {
  try {
    const verbsFile = fs.readFileSync(
      path.resolve(__dirname, "..", "csvs", "verbs.csv"),
      "utf8"
    );
    Papa.parse(verbsFile, {
      header: true,
      complete: (results, file) => {
        console.log("Parsing complete:", results, file);
        results.data.map((result) => {
          const { id, language_id, infinitive, example, regular, rank } =
            result;
          if (id) {
            const values: NewVerb = {
              id,
              languageId: language_id,
              infinitive,
              example,
              regular,
              rank,
            };
            allVerbs.push(values);
          }
        });
      },
    });
  } catch (e) {
    console.error(e);
  }
};

const seedConjugations = async () => {
  try {
    const conjugationsFile = fs.readFileSync(
      path.resolve(__dirname, "..", "csvs", "conjugations.csv"),
      "utf8"
    );
    Papa.parse(conjugationsFile, {
      header: true,
      delimiter: ",",
      complete: (results, file) => {
        console.log("Parsing complete:", results, file);

        console.log(results);
        results.data.map((result) => {
          const { id, verb_id, tense_id, pronoun, finite } = result;
          console.log(id);
          if (id) {
            const values: NewConjugation = {
              id,
              verbId: verb_id,
              tenseId: tense_id,
              pronoun,
              finite,
            };
            allConjugations.push(values);
          }
        });
      },
    });
  } catch (e) {
    console.error(e);
  }
};

await seedLanguagesAndTenses();
await seedVerbs();
await seedConjugations();
await Promise.all(
  allTenses.map(async (tense) => {
    try {
      await insertTense(tense);
    } catch (e) {
      console.error(e);
    }
  })
);
console.log("tenses seeded");
await Promise.all(
  allVerbs.map(async (verb) => {
    try {
      await insertVerb(verb);
    } catch (e) {
      console.error(e);
    }
  })
);
console.log("verbs seeded");
await Promise.all(
  allConjugations.map(async (conjugation) => {
    try {
      await insertConjugation(conjugation);
    } catch (e) {
      console.error(e);
    }
  })
);
console.log("conjugations seeded");
process.exit(0);
