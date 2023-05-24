/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sneaker` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Variant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Sneaker" DROP CONSTRAINT "Sneaker_imagesId_fkey";

-- DropForeignKey
ALTER TABLE "Sneaker" DROP CONSTRAINT "Sneaker_ordersId_fkey";

-- DropForeignKey
ALTER TABLE "Variant" DROP CONSTRAINT "Variant_sneakerPid_fkey";

-- DropForeignKey
ALTER TABLE "Variant" DROP CONSTRAINT "Variant_variantImgId_fkey";

-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "SneakerId" TEXT[];

-- DropTable
DROP TABLE "Image";

-- DropTable
DROP TABLE "Sneaker";

-- DropTable
DROP TABLE "Variant";
