/*
  Warnings:

  - A unique constraint covering the columns `[paymentId]` on the table `Orders` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Orders_paymentId_key" ON "Orders"("paymentId");
