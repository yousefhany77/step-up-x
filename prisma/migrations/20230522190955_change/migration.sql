/*
  Warnings:

  - You are about to drop the column `SneakerId` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Orders` table. All the data in the column will be lost.
  - Added the required column `customerEmail` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerName` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `paymentStatus` on the `Orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "paymentStatus" AS ENUM ('paid', 'unpaid');

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "SneakerId",
DROP COLUMN "address",
DROP COLUMN "email",
DROP COLUMN "phone",
DROP COLUMN "userId",
ADD COLUMN     "customerEmail" TEXT NOT NULL,
ADD COLUMN     "customerName" TEXT NOT NULL,
ADD COLUMN     "customerPhone" TEXT,
DROP COLUMN "paymentStatus",
ADD COLUMN     "paymentStatus" "paymentStatus" NOT NULL;

-- DropEnum
DROP TYPE "Brand";

-- DropEnum
DROP TYPE "Gender";

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "SneakerId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "discount" DECIMAL(65,30),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
