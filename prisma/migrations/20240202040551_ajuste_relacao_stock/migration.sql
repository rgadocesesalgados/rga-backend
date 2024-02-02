/*
  Warnings:

  - A unique constraint covering the columns `[stock_id]` on the table `products` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "products_stock_id_key" ON "products"("stock_id");
