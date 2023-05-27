/*
  Warnings:

  - You are about to drop the column `shippintStatus` on the `Orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "shippintStatus",
ADD COLUMN     "shippingStatus" "ShippingStatus" DEFAULT 'pending';
