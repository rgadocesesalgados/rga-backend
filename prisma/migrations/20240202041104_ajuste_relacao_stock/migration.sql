/*
  Warnings:

  - You are about to drop the column `stock_id` on the `products` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[product_id]` on the table `stocks` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `product_id` to the `stocks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_stock_id_fkey";

-- DropIndex
DROP INDEX "products_stock_id_key";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "stock_id";

-- AlterTable
ALTER TABLE "stocks" ADD COLUMN     "product_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "stocks_product_id_key" ON "stocks"("product_id");

-- AddForeignKey
ALTER TABLE "stocks" ADD CONSTRAINT "stocks_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
