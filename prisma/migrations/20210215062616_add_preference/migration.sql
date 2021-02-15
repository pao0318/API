/*
  Warnings:

  - You are about to drop the column `personalInterests` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "personalInterests";

-- CreateTable
CREATE TABLE "Preference" (
    "id" TEXT NOT NULL,
    "book" TEXT,
    "author" TEXT,
    "genres" "Genre"[],
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Preference.userId_unique" ON "Preference"("userId");

-- AddForeignKey
ALTER TABLE "Preference" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
