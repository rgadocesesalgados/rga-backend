/*
  Warnings:

  - You are about to drop the `stocks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "stocks" DROP CONSTRAINT "stocks_product_id_fkey";

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "priority" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "stocks";
