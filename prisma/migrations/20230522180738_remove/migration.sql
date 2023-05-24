/*
  Warnings:

  - You are about to drop the column `cartId` on the `Sneaker` table. All the data in the column will be lost.
  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Sneaker" DROP CONSTRAINT "Sneaker_cartId_fkey";

-- AlterTable
ALTER TABLE "Sneaker" DROP COLUMN "cartId";

-- DropTable
DROP TABLE "Cart";
