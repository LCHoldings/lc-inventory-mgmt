/*
  Warnings:

  - You are about to drop the column `imageId` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `Manufacturer` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `Model` table. All the data in the column will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserImages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_imageId_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_imageId_fkey";

-- DropForeignKey
ALTER TABLE "Manufacturer" DROP CONSTRAINT "Manufacturer_imageId_fkey";

-- DropForeignKey
ALTER TABLE "Model" DROP CONSTRAINT "Model_imageId_fkey";

-- DropForeignKey
ALTER TABLE "_UserImages" DROP CONSTRAINT "_UserImages_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserImages" DROP CONSTRAINT "_UserImages_B_fkey";

-- AlterTable
ALTER TABLE "Device" DROP COLUMN "imageId",
ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "imageId",
ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "Manufacturer" DROP COLUMN "imageId",
ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "Model" DROP COLUMN "imageId",
ADD COLUMN     "image" TEXT;

-- DropTable
DROP TABLE "Image";

-- DropTable
DROP TABLE "_UserImages";
