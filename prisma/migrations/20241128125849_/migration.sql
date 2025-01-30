/*
  Warnings:

  - You are about to drop the column `purchaseOrderid` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `current_userId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `purchase_cost` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `purchase_date` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `purchase_orderid` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `serial_number` on the `Item` table. All the data in the column will be lost.
  - The primary key for the `Supplier` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `contact_person` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `email_adress` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `post_adress` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `supplierid` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `account_Type` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email_verified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `employee_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `job_title` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `User` table. All the data in the column will be lost.
  - Added the required column `contactPerson` to the `Supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emailAdress` to the `Supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postAdress` to the `Supplier` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_supplierId_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_current_userId_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_supplierId_fkey";

-- DropIndex
DROP INDEX "Supplier_supplierid_key";

-- AlterTable
ALTER TABLE "Device" DROP COLUMN "purchaseOrderid",
ADD COLUMN     "purchaseOrderId" BIGINT;

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "current_userId",
DROP COLUMN "purchase_cost",
DROP COLUMN "purchase_date",
DROP COLUMN "purchase_orderid",
DROP COLUMN "serial_number",
ADD COLUMN     "currentUserId" TEXT,
ADD COLUMN     "purchaseCost" TEXT,
ADD COLUMN     "purchaseDate" TIMESTAMP(3),
ADD COLUMN     "purchaseOrderId" BIGINT,
ADD COLUMN     "serialNumber" TEXT,
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "Supplier" DROP CONSTRAINT "Supplier_pkey",
DROP COLUMN "contact_person",
DROP COLUMN "email_adress",
DROP COLUMN "phone_number",
DROP COLUMN "post_adress",
DROP COLUMN "supplierid",
ADD COLUMN     "contactPerson" TEXT NOT NULL,
ADD COLUMN     "emailAdress" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "postAdress" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Supplier_id_seq";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "account_Type",
DROP COLUMN "email_verified",
DROP COLUMN "employee_id",
DROP COLUMN "job_title",
DROP COLUMN "phone_number",
ADD COLUMN     "accountType" TEXT NOT NULL DEFAULT 'viewer',
ADD COLUMN     "emailVerified" TIMESTAMP(3),
ADD COLUMN     "employeeId" TEXT,
ADD COLUMN     "jobTitle" TEXT,
ADD COLUMN     "phoneNumber" TEXT;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
