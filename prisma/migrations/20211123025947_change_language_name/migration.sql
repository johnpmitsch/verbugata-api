/*
  Warnings:

  - You are about to drop the column `langauge` on the `Language` table. All the data in the column will be lost.
  - Added the required column `name` to the `Language` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Language" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Language" ("id") SELECT "id" FROM "Language";
DROP TABLE "Language";
ALTER TABLE "new_Language" RENAME TO "Language";
CREATE UNIQUE INDEX "Language_name_key" ON "Language"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
