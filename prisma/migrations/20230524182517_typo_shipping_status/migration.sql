/*
  Warnings:

  - Made the column `shippingStatus` on table `Orders` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Orders" ALTER COLUMN "shippingStatus" SET NOT NULL;
