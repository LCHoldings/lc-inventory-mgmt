/*
  Warnings:

  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVerified",
DROP COLUMN "username",
ADD COLUMN     "email_verified" TIMESTAMP(3),
ADD COLUMN     "name" TEXT;
