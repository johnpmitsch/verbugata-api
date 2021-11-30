-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tense" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "english_name" TEXT NOT NULL,
    "example" TEXT NOT NULL,
    "example_verb" TEXT NOT NULL,
    "languageId" INTEGER NOT NULL,

    CONSTRAINT "Tense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Verb" (
    "id" SERIAL NOT NULL,
    "infinitive" TEXT NOT NULL,
    "example" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "regular" BOOLEAN NOT NULL DEFAULT false,
    "languageId" INTEGER NOT NULL,

    CONSTRAINT "Verb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conjugation" (
    "id" SERIAL NOT NULL,
    "pronoun" TEXT NOT NULL,
    "finite" TEXT NOT NULL,
    "verbId" INTEGER NOT NULL,
    "tenseId" INTEGER NOT NULL,

    CONSTRAINT "Conjugation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Language_name_key" ON "Language"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tense_name_key" ON "Tense"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Verb_infinitive_key" ON "Verb"("infinitive");

-- CreateIndex
CREATE UNIQUE INDEX "Conjugation_pronoun_finite_key" ON "Conjugation"("pronoun", "finite");

-- AddForeignKey
ALTER TABLE "Tense" ADD CONSTRAINT "Tense_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Verb" ADD CONSTRAINT "Verb_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conjugation" ADD CONSTRAINT "Conjugation_verbId_fkey" FOREIGN KEY ("verbId") REFERENCES "Verb"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conjugation" ADD CONSTRAINT "Conjugation_tenseId_fkey" FOREIGN KEY ("tenseId") REFERENCES "Tense"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
