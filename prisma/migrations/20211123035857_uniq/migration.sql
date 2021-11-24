/*
  Warnings:

  - A unique constraint covering the columns `[pronoun,finite]` on the table `Conjugation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Tense` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Conjugation_pronoun_finite_key" ON "Conjugation"("pronoun", "finite");

-- CreateIndex
CREATE UNIQUE INDEX "Tense_name_key" ON "Tense"("name");
