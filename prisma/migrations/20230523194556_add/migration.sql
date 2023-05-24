/*
  Warnings:

  - Added the required column `customerId` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "customerId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Orders_customerId_idx" ON "Orders"("customerId");
