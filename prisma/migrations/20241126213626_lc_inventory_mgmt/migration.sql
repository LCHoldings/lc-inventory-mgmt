/*
  Warnings:

  - A unique constraint covering the columns `[default]` on the table `Status` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Status" ALTER COLUMN "default" SET DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Status_default_key" ON "Status"("default");
