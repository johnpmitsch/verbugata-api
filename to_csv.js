const fs = require("fs");
const data = require("./db.json");
const availableTenses = require("./available_tenses");
const language = "portuguese";
const language_id = 1;

const tenses_csv_path = "./csvs/tenses.csv";
const verbs_csv_path = "./csvs/verbs.csv";

// Create a CSV from data that can be used to seed a database

/* TENSES TABLE */
const firstConjugation = data["conjugations"][0];
const tenses = Object.keys(firstConjugation);
fs.truncate(tenses_csv_path, 0, () => {
  console.log("\nWRITING TENSES\n");
  console.log(`${tenses_csv_path} cleared`);
  const header = "id,language_id,name,english_name,example,example_verb\n";
  fs.appendFileSync(tenses_csv_path, header);
  console.log(`Writing ${tenses.length} tenses to ${tenses_csv_path}`);

  tenses.forEach((tense, i) => {
    if (tense !== "verb_id") {
      const { english_name, example, example_verb } = availableTenses[tense];
      const row = `${
        i + 1
      },${language_id},${tense},${english_name},\"${example}\",${example_verb}\n`;
      fs.appendFileSync(tenses_csv_path, row);
    }
  });
  console.log(`${tenses_csv_path} written!`);
});

/* VERBS TABLE */

fs.truncate(verbs_csv_path, 0, () => {
  console.log("\nWRITING VERBS\n");
  console.log(`${verbs_csv_path} cleared`);
  const header = "id,language_id,infinitive,example,regular,rank\n";
  fs.appendFileSync(verbs_csv_path, header);
  const verbs = data["verbs"];
  console.log(`Writing ${verbs.length} verbs to ${verbs_csv_path}`);
  verbs.forEach((verb_info, i) => {
    const { verb, example, regular, id: rank } = verb_info;
    const row = `${i + 1},${language_id},${verb},\"${example}\",${
      regular ? 1 : 0
    }, ${rank}\n`;
    fs.appendFileSync(verbs_csv_path, row);
  });
  console.log(`${verbs_csv_path} written!`);
});
