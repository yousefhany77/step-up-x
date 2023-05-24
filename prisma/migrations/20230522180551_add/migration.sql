-- CreateEnum
CREATE TYPE "Brand" AS ENUM ('adidas', 'alexander_mcqueen', 'balenciaga', 'chanel', 'converse', 'crocs', 'dior', 'gucci', 'jordan', 'louis_vuitton', 'new_balance', 'nike', 'off_white', 'on', 'prada', 'puma', 'reebok', 'under_armour', 'vans', 'versace', 'yeezy');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('youth', 'toddler', 'infant', 'men', 'women', 'preschool', 'child', 'unisex');

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "original" TEXT NOT NULL,
    "small" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "extraImg" TEXT[],
    "view_360" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sneaker" (
    "pid" TEXT NOT NULL,
    "brand" "Brand" NOT NULL,
    "gender" "Gender" NOT NULL,
    "name" VARCHAR(512) NOT NULL,
    "description" TEXT,
    "discount" DECIMAL(5,2),
    "sizes" INTEGER[],
    "sku" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "price" DECIMAL(5,2) NOT NULL,
    "silhouette" TEXT NOT NULL,
    "imagesId" TEXT NOT NULL,
    "colorway" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cartId" TEXT,
    "ordersId" TEXT,

    CONSTRAINT "Sneaker_pkey" PRIMARY KEY ("pid")
);

-- CreateTable
CREATE TABLE "Variant" (
    "id" TEXT NOT NULL,
    "colorway" TEXT NOT NULL,
    "sneakerPid" TEXT NOT NULL,
    "variantImgId" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sizes" INTEGER[],
    "has360View" BOOLEAN NOT NULL DEFAULT false,
    "price" DECIMAL(10,2),
    "name" VARCHAR(512),
    "discount" DECIMAL(5,2),

    CONSTRAINT "Variant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "paymentStatus" TEXT NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sneaker_sku_key" ON "Sneaker"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "Sneaker_imagesId_key" ON "Sneaker"("imagesId");

-- CreateIndex
CREATE INDEX "Sneaker_brand_idx" ON "Sneaker"("brand");

-- CreateIndex
CREATE INDEX "Sneaker_colorway_idx" ON "Sneaker"("colorway");

-- CreateIndex
CREATE INDEX "Sneaker_gender_idx" ON "Sneaker"("gender");

-- CreateIndex
CREATE INDEX "name_brand_silhouette" ON "Sneaker"("name", "brand", "silhouette");

-- CreateIndex
CREATE UNIQUE INDEX "Variant_variantImgId_key" ON "Variant"("variantImgId");

-- CreateIndex
CREATE UNIQUE INDEX "Variant_sku_key" ON "Variant"("sku");

-- CreateIndex
CREATE INDEX "colorway" ON "Variant"("colorway");

-- CreateIndex
CREATE UNIQUE INDEX "Variant_sku_colorway_key" ON "Variant"("sku", "colorway");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_userId_key" ON "Cart"("userId");

-- AddForeignKey
ALTER TABLE "Sneaker" ADD CONSTRAINT "Sneaker_imagesId_fkey" FOREIGN KEY ("imagesId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sneaker" ADD CONSTRAINT "Sneaker_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sneaker" ADD CONSTRAINT "Sneaker_ordersId_fkey" FOREIGN KEY ("ordersId") REFERENCES "Orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_sneakerPid_fkey" FOREIGN KEY ("sneakerPid") REFERENCES "Sneaker"("pid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_variantImgId_fkey" FOREIGN KEY ("variantImgId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
