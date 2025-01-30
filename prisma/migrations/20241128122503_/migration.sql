/*
  Warnings:

  - You are about to drop the column `current_userId` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `purchase_cost` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `purchase_date` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `purchase_orderid` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `serial_number` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `item_type` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `site_url` on the `Manufacturer` table. All the data in the column will be lost.
  - You are about to drop the column `support_email` on the `Manufacturer` table. All the data in the column will be lost.
  - You are about to drop the column `support_phone` on the `Manufacturer` table. All the data in the column will be lost.
  - You are about to drop the column `support_url` on the `Manufacturer` table. All the data in the column will be lost.
  - You are about to drop the column `model_number` on the `Model` table. All the data in the column will be lost.
  - You are about to drop the column `account_type` on the `User` table. All the data in the column will be lost.
  - Added the required column `itemType` to the `Log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supportEmail` to the `Manufacturer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_current_userId_fkey";

-- AlterTable
ALTER TABLE "Device" DROP COLUMN "current_userId",
DROP COLUMN "purchase_cost",
DROP COLUMN "purchase_date",
DROP COLUMN "purchase_orderid",
DROP COLUMN "serial_number",
ADD COLUMN     "currentUserId" TEXT,
ADD COLUMN     "purchaseCost" TEXT,
ADD COLUMN     "purchaseDate" TIMESTAMP(3),
ADD COLUMN     "purchaseOrderid" BIGINT,
ADD COLUMN     "serialNumber" TEXT;

-- AlterTable
ALTER TABLE "Log" DROP COLUMN "item_type",
ADD COLUMN     "itemType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Manufacturer" DROP COLUMN "site_url",
DROP COLUMN "support_email",
DROP COLUMN "support_phone",
DROP COLUMN "support_url",
ADD COLUMN     "siteUrl" TEXT,
ADD COLUMN     "supportEmail" TEXT NOT NULL,
ADD COLUMN     "supportPhone" TEXT,
ADD COLUMN     "supportUrl" TEXT;

-- AlterTable
ALTER TABLE "Model" DROP COLUMN "model_number",
ADD COLUMN     "modelNumber" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "account_type",
ADD COLUMN     "account_Type" TEXT NOT NULL DEFAULT 'viewer',
ADD COLUMN     "bookmarks" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_currentUserId_fkey" FOREIGN KEY ("currentUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
