/*
  Warnings:

  - Added the required column `total` to the `order_products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_products" ADD COLUMN     "total" DOUBLE PRECISION NOT NULL;
