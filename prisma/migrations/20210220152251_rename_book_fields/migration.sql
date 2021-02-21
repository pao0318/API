/*
  Warnings:

  - You are about to drop the column `ownedById` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `borrowedById` on the `Book` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_borrowedById_fkey";

-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_ownedById_fkey";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "ownedById",
DROP COLUMN "borrowedById",
ADD COLUMN     "ownerId" TEXT NOT NULL,
ADD COLUMN     "borrowerId" TEXT;

-- AddForeignKey
ALTER TABLE "Book" ADD FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD FOREIGN KEY ("borrowerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
