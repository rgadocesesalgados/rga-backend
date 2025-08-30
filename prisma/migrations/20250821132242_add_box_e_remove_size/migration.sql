/*
  Warnings:

  - You are about to drop the column `size` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "boxes" INTEGER[];

-- AlterTable
ALTER TABLE "order_products" ADD COLUMN     "boxId" TEXT;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "size";

-- DropEnum
DROP TYPE "Size";

-- CreateTable
CREATE TABLE "Box" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Box_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "order_products" ADD CONSTRAINT "order_products_boxId_fkey" FOREIGN KEY ("boxId") REFERENCES "Box"("id") ON DELETE SET NULL ON UPDATE CASCADE;
