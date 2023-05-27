/*
  Warnings:

  - The `shippintStatus` column on the `Orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ShippingStatus" AS ENUM ('pending', 'shipped', 'delivered');

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "shippintStatus",
ADD COLUMN     "shippintStatus" "ShippingStatus" DEFAULT 'pending';
