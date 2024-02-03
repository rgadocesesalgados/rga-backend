/*
  Warnings:

  - The primary key for the `categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `products` table. All the data in the column will be lost.
  - Added the required column `category_name` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_category_id_fkey";

-- AlterTable
ALTER TABLE "categories" DROP CONSTRAINT "categories_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "category_id",
ADD COLUMN     "category_name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_name_fkey" FOREIGN KEY ("category_name") REFERENCES "categories"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
