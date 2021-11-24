const { PrismaClient } = require("@prisma/client");
const csv = require("fast-csv");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

const seed = async () => {
  await prisma.$connect();

  await prisma.language.upsert({
    where: {
      name: "portuguese",
    },
    update: {},
    create: {
      name: "portuguese",
    },
  });

  console.log("seeding verbs");
  fs.createReadStream(path.resolve(__dirname, "..", "csvs", "verbs.csv"))
    .pipe(csv.parse({ headers: true }))
    .pipe(csv.format({ headers: true }))
    .transform(async (row, next) => {
      const { language_id, infinitive, example, regular, rank } = row;
      // Using upsert as a "find or create" type function
      // Seems to be skipping the last couple verbs?
      await prisma.verb.upsert({
        where: { infinitive },
        update: {},
        create: {
          infinitive,
          example,
          rank: parseInt(rank),
          regular: !!regular,
          language: { connect: { id: parseInt(language_id) } },
        },
      });
      setImmediate(() => next());
    })
    .on("end", () => process.exit());

  console.log("seeding tenses");
  fs.createReadStream(path.resolve(__dirname, "..", "csvs", "tenses.csv"))
    .pipe(csv.parse({ headers: true }))
    .pipe(csv.format({ headers: true }))
    .transform(async (row, next) => {
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
    .on("end", () => process.exit());

  console.log("seeding conjugations");
  fs.createReadStream(path.resolve(__dirname, "..", "csvs", "conjugations.csv"))
    .pipe(csv.parse({ headers: true }))
    .pipe(csv.format({ headers: true }))
    .transform(async (row, next) => {
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
    .on("end", () => process.exit());
};

seed();
