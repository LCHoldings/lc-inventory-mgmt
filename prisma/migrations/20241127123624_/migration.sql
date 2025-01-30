/*
  Warnings:

  - The primary key for the `Device` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `deviceid` on the `Device` table. All the data in the column will be lost.
  - The primary key for the `Item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `itemid` on the `Item` table. All the data in the column will be lost.
  - The primary key for the `Location` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `locationid` on the `Location` table. All the data in the column will be lost.
  - The primary key for the `Log` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `logid` on the `Log` table. All the data in the column will be lost.
  - The primary key for the `Manufacturer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `manufacturerid` on the `Manufacturer` table. All the data in the column will be lost.
  - The primary key for the `Status` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `statusid` on the `Status` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_manufacturerId_fkey";

-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_statusId_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_manufacturerId_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_statusId_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_parentLocationId_fkey";

-- DropForeignKey
ALTER TABLE "Model" DROP CONSTRAINT "Model_manufacturerId_fkey";

-- DropIndex
DROP INDEX "Device_deviceid_key";

-- DropIndex
DROP INDEX "Item_itemid_key";

-- DropIndex
DROP INDEX "Location_locationid_key";

-- DropIndex
DROP INDEX "Log_logid_key";

-- DropIndex
DROP INDEX "Manufacturer_manufacturerid_key";

-- DropIndex
DROP INDEX "Status_statusid_key";

-- AlterTable
ALTER TABLE "Device" DROP CONSTRAINT "Device_pkey",
DROP COLUMN "deviceid",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Device_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Device_id_seq";

-- AlterTable
ALTER TABLE "Item" DROP CONSTRAINT "Item_pkey",
DROP COLUMN "itemid",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Item_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Item_id_seq";

-- AlterTable
ALTER TABLE "Location" DROP CONSTRAINT "Location_pkey",
DROP COLUMN "locationid",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Location_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Location_id_seq";

-- AlterTable
ALTER TABLE "Log" DROP CONSTRAINT "Log_pkey",
DROP COLUMN "logid",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Log_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Log_id_seq";

-- AlterTable
ALTER TABLE "Manufacturer" DROP CONSTRAINT "Manufacturer_pkey",
DROP COLUMN "manufacturerid",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Manufacturer_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Manufacturer_id_seq";

-- AlterTable
ALTER TABLE "Status" DROP CONSTRAINT "Status_pkey",
DROP COLUMN "statusid",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Status_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Status_id_seq";

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_parentLocationId_fkey" FOREIGN KEY ("parentLocationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
