-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('ACTION', 'ADVENTURE', 'BIOGRAPHY', 'BUSINESS', 'CHILDRENS', 'COOKING', 'CRIME', 'DRAMA', 'DICTIONARY', 'ENCYKLOPEDIA', 'GUIDE', 'FAIRYTALE', 'FANTASY', 'HEALTH', 'HISTORICAL', 'HUMOR', 'HORROR', 'JOURNAL', 'MATH', 'ROMANCE', 'PHILOSOPHY', 'RELIGION', 'SCIENCE_FICTION', 'SELF_DEVELOPMENT', 'SPORTS', 'TRAVEL', 'WESTERN');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('ENGLISH', 'GERMAN', 'FRENCH', 'SPANISH');

-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('REGULAR', 'GOOGLE', 'FACEBOOK');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "username" TEXT,
    "password" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "avatar" TEXT NOT NULL DEFAULT E'default.jpg',
    "phoneNumber" TEXT,
    "personalInterests" "Genre"[],
    "accountType" "AccountType" NOT NULL DEFAULT E'REGULAR',
    "tokenVersion" INTEGER NOT NULL DEFAULT 1,
    "rating" DECIMAL(65,30),
    "latitude" DECIMAL(65,30),
    "longitude" DECIMAL(65,30),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConfirmationCode" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expiresAt" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookData" (
    "id" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "author" TEXT,
    "genre" "Genre" NOT NULL,
    "language" "Language" NOT NULL,
    "image" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "author" TEXT,
    "genre" "Genre" NOT NULL,
    "language" "Language" NOT NULL,
    "image" TEXT NOT NULL,
    "rating" DECIMAL(65,30),
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "ownedById" TEXT NOT NULL,
    "borrowedById" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookReview" (
    "id" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "rating" DECIMAL(65,30) NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserReview" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "rating" DECIMAL(65,30) NOT NULL,
    "userId" TEXT NOT NULL,
    "reviewerId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User.phoneNumber_unique" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ConfirmationCode.userId_unique" ON "ConfirmationCode"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "BookData.isbn_unique" ON "BookData"("isbn");

-- AddForeignKey
ALTER TABLE "ConfirmationCode" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD FOREIGN KEY ("ownedById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD FOREIGN KEY ("borrowedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookReview" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserReview" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserReview" ADD FOREIGN KEY ("reviewerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
