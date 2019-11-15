# Verbugata API

Backend API server for www.verbugata.com

## Usage

The verb list in the `verb-info/pt_1000verbs.csv` file is parsed using `verb-info/parse_and_upload`. See the comments in that file for more on how that script works. The verb list is turned into a JSON file `db.json` and that file is used as an API using the `json-server` package.

## Contributing

Any conjugation corrections or additions should be done to `verb-info/pt_1000verbs.csv` as that is considered the single source of truth

## Attributions

The verb list in `pt_1000verbs.csv` is borrowed from https://github.com/Troyciv/PT_ConjugationTrainer_Anki. Many thanks to the hard work of those who compiled this list.
