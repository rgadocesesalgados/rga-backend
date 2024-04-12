/*
  Warnings:

  - You are about to drop the column `category_name` on the `products` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_category_name_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "category_name",
ADD COLUMN     "category_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
