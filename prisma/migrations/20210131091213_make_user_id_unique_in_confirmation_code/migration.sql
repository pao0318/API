/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[userId]` on the table `ConfirmationCode`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ConfirmationCode.userId_unique" ON "ConfirmationCode"("userId");
