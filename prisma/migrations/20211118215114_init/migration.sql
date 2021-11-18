-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "Language" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "langauge" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Tense" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "english_name" TEXT NOT NULL,
    "example" TEXT NOT NULL,
    "example_verb" TEXT NOT NULL,
    "languageId" INTEGER NOT NULL,
    CONSTRAINT "Tense_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Verb" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "infinitive" TEXT NOT NULL,
    "example" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "regular" BOOLEAN NOT NULL DEFAULT false,
    "languageId" INTEGER NOT NULL,
    CONSTRAINT "Verb_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Conjugation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pronoun" TEXT NOT NULL,
    "finite" TEXT NOT NULL,
    "verbId" INTEGER NOT NULL,
    "tenseId" INTEGER NOT NULL,
    CONSTRAINT "Conjugation_verbId_fkey" FOREIGN KEY ("verbId") REFERENCES "Verb" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Conjugation_tenseId_fkey" FOREIGN KEY ("tenseId") REFERENCES "Tense" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Language_langauge_key" ON "Language"("langauge");

-- CreateIndex
CREATE UNIQUE INDEX "Verb_infinitive_key" ON "Verb"("infinitive");
